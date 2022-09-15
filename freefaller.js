class FreeFaller {
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.w=80;
        this.h=50;
        this.acceleration=2;
        this.controls=new Controls();
    }

    animate(){
        if(this.controls.left)
            this.x-=2;
        if(this.controls.right)
            this.x+=2;
        if(this.controls.headDown)
            this.acceleration+=2
        else if(this.acceleration>2)
            this.acceleration-=2
        if(this.acceleration>16)
            this.acceleration=16
        this.y+=this.acceleration
    }
    
    draw(ctx){
        ctx.fillRect(this.x-this.w/2.0,this.y-this.h/2.0,this.w,this.h)
    }
    
}