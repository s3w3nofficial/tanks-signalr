namespace tanks
{
    public class Bullet 
    {
        public int x { get; set; }
        public int y { get; set; }
        public int formX { get; set; }
        public int fromY { get; set; }
        public int dirX { get; set; }
        public int dirY { get; set; }
        public int time { get; set; }
        public Bullet(int x, int y, int dirX, int dirY, int time)
        {
            this.x = x;
            this.y = y;
            this.formX = x;
            this.fromY = y;
            this.dirX = dirX;
            this.dirY = dirY;
            this.time = time;
        }
    }
}