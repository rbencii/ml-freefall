function lerp(A,B,t){
    return A+(B-A)*t
}

class Eyes{

    constructor(freefaller){
        this.freefaller=freefaller;
        this.receptors=Array(6);
        this.recLength=190;
        this.fov=Math.PI/180.0*120;
    }

    animate(){
        for(let i=0; i<this.receptors.length;i++){
            const angle=lerp(this.fov/2,-this.fov/2,i/(this.receptors.length-1));
            this.receptors[i]=[{x:this.freefaller.x, y:this.freefaller.y+this.freefaller.h/2.0},
                {x:this.freefaller.x+Math.sin(angle)*this.recLength, y:this.freefaller.y+Math.cos(angle)*this.recLength}]
        }
    }

    draw(ctx){
        for(let i=0; i<this.receptors.length;i++){
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="yellow";
            ctx.moveTo(
                this.receptors[i][0].x,
                this.receptors[i][0].y
            );
            ctx.lineTo(
                this.receptors[i][1].x,
                this.receptors[i][1].y
            );
            ctx.stroke();
        }

    }

}