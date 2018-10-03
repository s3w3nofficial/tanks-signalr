using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace tanks
{
    public class ApplicationHub : Hub
    {
        public Task Send(string message)
        {
            return Clients.All.SendAsync("Send", message);
        }

        public Task updatePlayer(Player player)
        {
            Data.players[Context.ConnectionId.ToLower()] = player;
            return Clients.All.SendAsync("updatePlayers", Data.players);
        }

        public override async Task OnConnectedAsync()
        {
            if (!Data.players.ContainsKey(Context.ConnectionId.ToLower()))
                Data.players.Add(Context.ConnectionId.ToLower(), new Player());

            await Clients.All.SendAsync("addPlayer", Data.players);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            Data.players.Remove(Context.ConnectionId.ToLower());
            await Clients.All.SendAsync("updatePlayers", Data.players);
            await base.OnDisconnectedAsync(exception);
        }
    }
}