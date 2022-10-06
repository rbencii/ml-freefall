class Cloud {
    constructor(x,y,gc){
        this.x=x;
        this.y=y;
        this.w=Math.floor(Math.random()*(gc.width-100)+50);
        this.h=50;
        this.minSpeed=2;
        this.points=[{x:this.x-this.w/2.0, y:this.y-this.h/2.0},
                     {x:this.x+this.w/2.0, y:this.y-this.h/2.0},
                     {x:this.x-this.w/2.0, y:this.y+this.h/2.0},
                     {x:this.x+this.w/2.0, y:this.y+this.h/2.0}];
        this.hit=false;
    }
    
    animate(dt){
        this.y-=(this.minSpeed*100/1000.0)*dt;
    }

    isDead(){
        return this.y+this.h/2.0<0;
    }

    draw(ctx){
        if(this.hit)
            ctx.fillStyle='red';
        ctx.fillRect(this.x-this.w/2.0,this.y-this.h/2.0,this.w,this.h)
        ctx.fillStyle='black';
    }
    
}