class Cloud {
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.w=Math.floor(Math.random()*101+100);
        this.h=50;
    }
    
    draw(ctx){
        ctx.fillRect(this.x-this.w/2.0,this.y-this.h/2.0,this.w,this.h)
    }
    
}