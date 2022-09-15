class Cloud {
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.w=Math.floor(Math.random()*101+100);
        this.h=50;
        this.minSpeed=2;
    }
    
    animate(dt){
        this.y-=this.minSpeed*dt;
    }

    isDead(){
        return this.y<0;
    }

    draw(ctx){
        ctx.fillRect(this.x-this.w/2.0,this.y-this.h/2.0,this.w,this.h)
    }
    
}