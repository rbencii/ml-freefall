class FreeFaller {
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.w=80;
        this.h=50;
        this.acceleration=3;
        this.speed=2;
        this.maxSpeed=8;
        this.minSpeed=2;
        this.controls=new Controls();
    }

    animate(dt){
        if(this.controls.left)
            this.x-=2;

        if(this.controls.right)
            this.x+=2;

        if(this.controls.headDown)
            this.speed+=this.acceleration*dt;
        else if(this.speed>2)
            this.speed=Math.max(this.speed-this.acceleration*dt,this.minSpeed);
        

        if(this.speed>this.maxSpeed)
            this.speed=this.maxSpeed;

        this.y+=this.speed
        if(this.y>100)
            this.y-=this.acceleration;
    }
    
    draw(ctx){
        if(!this.controls.headDown)
            ctx.fillRect(this.x-this.w/2.0,this.y-this.h/2.0,this.w,this.h);
        else
            ctx.fillRect(this.x-this.h/2.0,this.y,this.h,this.w);
    }
    
}