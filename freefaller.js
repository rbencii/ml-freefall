class FreeFaller {
    constructor(x,y,gc){
        this.x=x;
        this.y=y;
        this.baseW=80;
        this.baseH=50;
        this.w=80;
        this.h=50;
        this.acceleration=0.4;
        this.fallSpeed=2;
        this.maxFallSpeed=5;
        this.sideSpeed=0;
        this.maxSideSpeed=3;
        this.minSpeed=2;
        this.gc=gc;
        this.controls=new Controls();
        this.eyes=new Eyes(this);
    }

    // #collide(obj){
    //     if(this.x-this.w/2.0>obj.x-this.w/2.0 &&
    //        this.x-this.w/2.0<obj.x+this.w/2.0)

    // }

    animate(dt,clouds){
        /*if(this.controls.left)
            this.x-=this.minSpeed*dt;

        if(this.controls.right)
            this.x+=this.minSpeed*dt;*/

        //let width=this.controls.headDown?this.h:this.w;

        if(this.controls.headDown)
            [this.w,this.h]=[this.baseH,this.baseW]
        else
            [this.w,this.h]=[this.baseW,this.baseH]
        
        let width=this.w;          

        if(this.x-width/2.0>this.gc.width){
            this.x=width/2.0;
            this.y+=(100*(this.h*0.4)/1000)*dt;
        }


        if(this.x+width/2.0<0){
            this.x=this.gc.width-width/2.0;
            this.y-=(100*(this.h*0.4)/1000)*dt;
        }

        /*if(this.x-width/2.0>this.gc.width)
            this.x=0+width/2.0;

        if(this.x+width/2.0<0)
            this.x=this.gc.width-(0-this.x+width/2.0)+width/2.0;*/

        if(this.y<=100 || !this.controls.headDown)
            this.fallSpeed=0;

        if(this.controls.left){
            this.sideSpeed-=(this.acceleration*100/1000)*dt;
            if(!this.controls.headDown && !this.controls.right)
                this.fallSpeed+=(133*this.minSpeed/1000.0)*dt;
        }

        if(this.controls.right){
            this.sideSpeed+=(this.acceleration*100/1000)*dt;
            if(!this.controls.headDown && !this.controls.left)
                this.fallSpeed+=(133*this.minSpeed/1000.0)*dt;
        }


        if(Math.abs(this.sideSpeed)>Math.abs(this.maxSideSpeed))
            this.sideSpeed=Math.sign(this.sideSpeed)*(this.maxSideSpeed*100/1000)*dt;


        if(this.controls.headDown)
            this.fallSpeed+=(this.acceleration*100/4000)*dt;
        //else if(this.fallSpeed>2)
        //    this.fallSpeed=Math.max(this.fallSpeed-this.acceleration*(dt/4.0),this.minSpeed);
        
        if(this.y>=this.gc.height-this.h*1.5)
            this.fallSpeed=0;

        if(this.y>100 && !this.controls.headDown)
            this.fallSpeed-=(100*this.minSpeed/1000.0)*dt

        if(Math.abs(this.fallSpeed)>Math.abs(this.maxFallSpeed))
            this.fallSpeed=Math.sign(this.fallSpeed)*(this.maxFallSpeed*100/1000)*dt;

        //if(this.y>100 && !this.controls.headDown)
        //    this.fallSpeed=Math.min(this.fallSpeed-this.acceleration*(dt/24.0),this.minSpeed*dt);


        if(Math.abs(this.sideSpeed)>0.03 && !this.controls.right && !this.controls.left)
            this.sideSpeed-=Math.sign(this.sideSpeed)*(this.acceleration*100/7000)*dt
        else if(!this.controls.right && !this.controls.left)
            this.sideSpeed=0;



            let points=[{x:this.x-this.w/2.0, y:this.y-this.h/2.0},
            {x:this.x+this.w/2.0, y:this.y-this.h/2.0},
            {x:this.x-this.w/2.0, y:this.y+this.h/2.0},
            {x:this.x+this.w/2.0, y:this.y+this.h/2.0}];
            let touch=false;
        clouds.forEach(x=>{if(x.y<this.y){x.hit=true}});
        this.x+=this.sideSpeed
        this.y+=this.fallSpeed
        this.eyes.animate(clouds);

        
    }
    
    draw(ctx){
       /* if(!this.controls.headDown)
            ctx.fillRect(this.x-this.w/2.0,this.y-this.h/2.0,this.w,this.h);
        else
            ctx.fillRect(this.x-this.h/2.0,this.y,this.h,this.w);*/
        ctx.save()
        //let width=this.controls.headDown?this.h:this.w;
        //let height=this.controls.headDown?this.w:this.h;
        let width=this.w;
        let height=this.h;
        ctx.translate(this.x,this.y);
        //let y=this.controls.headDown?this.y:this.y;
        
        if(this.controls.left && !this.controls.right && !this.controls.headDown)
            ctx.rotate(Math.PI/180 * -10);
            
        if(this.controls.right && !this.controls.left && !this.controls.headDown)
            ctx.rotate(Math.PI/180 * 10);

        ctx.fillRect(-width/2.0,0,width,height)
        ctx.translate(-this.x,-this.y);
        ctx.restore();
        this.eyes.draw(ctx);

        ctx.save();
        ctx.fillStyle="lightgrey";
        let x;
        if(this.x+width/2.0>this.gc.width)
            x=0;
        else if(this.x-width/2.0<0)
            x=this.gc.width-(0-this.x+width/2.0);

        ctx.translate(x,this.y);

        if(this.controls.left && !this.controls.right && !this.controls.headDown)
            ctx.rotate(Math.PI/180 * -10);
            
        if(this.controls.right && !this.controls.left && !this.controls.headDown)
            ctx.rotate(Math.PI/180 * 10);

        if(this.x+width/2.0>this.gc.width)
            ctx.fillRect(0,0,this.x+width/2.0-this.gc.width,height);
        else if(this.x-width/2.0<0)
            ctx.fillRect(0,0,width,height);
        
            ctx.translate(-x,-this.y);
            ctx.restore();

        
        
        /*ctx.translate(this.x,this.y);
        ctx.rotate((Math.PI / 180) * -10);
        //ctx.fillRect(,this.y,width,height);
        ctx.fillRect(-width/2.0,0,width,height);
        ctx.translate(-this.x,-this.y);
        ctx.restore();
        ctx.fillStyle='black';*/



        /*
        let width=this.controls.headDown?this.h:this.w;
        let height=this.controls.headDown?this.w:this.h;
        //let y=this.controls.headDown?this.y:this.y;
        ctx.fillRect(this.x-width/2.0,this.y,width,height)
        if(this.x+width/2.0>this.gc.width)
            ctx.fillRect(0,this.y,this.x+width/2.0-this.gc.width,height);
        else if(this.x-width/2.0<0)
            ctx.fillRect(this.gc.width-(0-this.x+width/2.0),this.y,width,height);
        ctx.fillStyle='blue';
        ctx.save();*/
    }
    
}