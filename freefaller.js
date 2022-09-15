class FreeFaller {
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.w=80;
        this.h=50;
        this.acceleration=3;
        this.fallSpeed=2;
        this.maxFallSpeed=8;
        this.sideSpeed=0;
        this.maxSideSpeed=3;
        this.minSpeed=2;
        this.controls=new Controls();
    }

    animate(dt){
        /*if(this.controls.left)
            this.x-=this.minSpeed*dt;

        if(this.controls.right)
            this.x+=this.minSpeed*dt;*/

        if(this.y<=100 || !this.controls.headDown)
            this.fallSpeed=0;

        if(this.y>100 && !this.controls.headDown)
            this.fallSpeed-=this.minSpeed*dt

        if(this.controls.left){
            this.sideSpeed-=this.acceleration*(dt/8.0);
            this.fallSpeed+=2*this.minSpeed*dt;
        }

        if(this.controls.right){
            this.sideSpeed+=this.acceleration*(dt/8.0);
            this.fallSpeed+=2*this.minSpeed*dt;
        }


        if(Math.abs(this.sideSpeed)>Math.abs(this.maxSideSpeed))
            this.sideSpeed=Math.sign(this.sideSpeed)*this.maxSideSpeed;


        if(this.controls.headDown)
            this.fallSpeed+=this.acceleration*(dt/24.0);
        //else if(this.fallSpeed>2)
        //    this.fallSpeed=Math.max(this.fallSpeed-this.acceleration*(dt/4.0),this.minSpeed);
        

        if(Math.abs(this.fallSpeed)>Math.abs(this.maxFallSpeed))
            this.fallSpeed=Math.sign(this.fallSpeed)*this.maxFallSpeed;

        //if(this.y>100 && !this.controls.headDown)
        //    this.fallSpeed=Math.min(this.fallSpeed-this.acceleration*(dt/24.0),this.minSpeed*dt);


        if(Math.abs(this.sideSpeed)>0.03 && !this.controls.right && !this.controls.left)
            this.sideSpeed-=Math.sign(this.sideSpeed)*this.acceleration*(dt/24.0)
        else if(!this.controls.right && !this.controls.left)
            this.sideSpeed=0;

        this.x+=this.sideSpeed
        this.y+=this.fallSpeed
        console.log(this.fallSpeed);
    }
    
    draw(ctx){
        if(!this.controls.headDown)
            ctx.fillRect(this.x-this.w/2.0,this.y-this.h/2.0,this.w,this.h);
        else
            ctx.fillRect(this.x-this.h/2.0,this.y,this.h,this.w);
    }
    
}