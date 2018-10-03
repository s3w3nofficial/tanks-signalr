var playerID;
const canvasSizeX = 640;
const canvasSizeY = 480;
const cannonSize = 60;
const gravity = 0.0015;

(async function () {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl('/app')
        .build()

    const app = new Vue({
        el: '#app',
        data: {
            messages:[],
            newMessage: null
        },
        methods: {
            async addMessage() {
                await connection.invoke('Send', this.newMessage);
                this.newMessage = null;
            }
        }
    });
    
    connection.on('Send', message => {
        app.messages.push(message);
    });

    connection.on('addPlayer', players => {
        console.log(players)
        blobs = players
    });

    connection.on('updatePlayers', players => {
        blobs = players
    })

    await connection.start().then(() => { 
        playerID=connection.connection.transport.webSocket.url.split('id=')[1].toLowerCase()
        console.log(playerID) 
    });

    var canvas = document.getElementById('canvas');
    window.addEventListener('keydown', async (e) => {
        var code = e.keyCode;
        console.log(code)
        switch (code) {
            case 37: 
                blobs[playerID].x -= 5;
                break;
            case 39:
                blobs[playerID].x += 5;
                break;
            case 65: 
                blobs[playerID].x -= 5;
                break;
            case 68:
                blobs[playerID].x += 5;
                break;
        }
        await connection.invoke('updatePlayer', blobs[playerID]);
    });
    var ctx = canvas.getContext('2d');

    canvas.onmousemove = getMousePos
    canvas.onmousedown = addBullet

    setInterval(() => {

        // redraw background
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";

        // redraw players
        for (let key in blobs) {
            ellipse(ctx, blobs[key].x, blobs[key].y, 40, 40);
        }

        // trajektory
        let from = new Vector2D(blobs[playerID].x ,blobs[playerID].y)
        let dir = mousePos.sub(from).Normalize()
        let t = 0

        while(true) {
            t += 13
            let vec = Curve(from, dir, gravity, t).add(dir.mult(cannonSize))
            ellipse(ctx, vec.x, vec.y, 1, 1)

            if (!IsInside(canvasSizeX, canvasSizeY, vec.x, vec.y))
                break;
        }

        for (let i = bullets.length-1; i >= 0; i--) {
            let dir = bullets[i].dir.sub(bullets[i].from).Normalize()

            let vec = Curve(bullets[i].from, dir, gravity, bullets[i].time).add(dir.mult(cannonSize))
            ellipse(ctx, vec.x, vec.y, 3, 3)
            bullets[i].x = vec.x
            bullets[i].y = vec.y
            bullets[i].time += 1

            if (!IsInside(canvasSizeX, canvasSizeY, vec.x, vec.y))
                bullets.splice(i, 1)
        }

        //draw cannon
        ctx.strokeStyle = "Blue";
        ctx.beginPath();
        ctx.moveTo(from.x,from.y);
        ctx.lineWidth=8
        ctx.lineTo(from.x + dir.x * cannonSize,from.y + dir.y * cannonSize);
        ctx.stroke();
        ctx.lineWidth=1
        ctx.strokeStyle = "black";
    }, 1)

})();