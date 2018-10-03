using System;

namespace tanks
{
    public class Player 
    {
        public int x { get; set; }
        public int y { get; set; }

        public Player() 
        {
            Random rnd = new Random();
            x = rnd.Next(20, 35) * 10;
            y = 439;
        }
    }
}