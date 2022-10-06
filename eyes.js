class Eyes{

    constructor(freefaller){
        this.freefaller=freefaller;
        this.receptors=Array(9);
        this.outputs=Array(9);
        this.recLength=190;
        this.fov=Math.PI/180.0*120;
    }

    #getReading(ray,clouds){
        let touches=[];

        for(let i=0;i<traffic.length;i++){
            const poly=traffic[i].polygon;
            for(let j=0;j<poly.length;j++){
                const value=getIntersection(
                    ray[0],
                    ray[1],
                    poly[j],
                    poly[(j+1)%poly.length]
                );
                if(value){
                    touches.push(value);
                }
            }
        }

        if(touches.length==0){
            return null;
        }else{
            const offsets=touches.map(e=>e.offset);
            const minOffset=Math.min(...offsets);
            return touches.find(e=>e.offset==minOffset);
        }
    }

    animate(clouds){
        for(let i=0; i<this.receptors.length;i++){
            const angle=lerp(this.fov/2,-this.fov/2,i/(this.receptors.length-1));
            this.receptors[i]=[{x:this.freefaller.x, y:this.freefaller.y+this.freefaller.h/2.0},
                {x:this.freefaller.x+Math.sin(angle)*this.recLength, y:this.freefaller.y+Math.cos(angle)*this.recLength}]
        }
        /*for(let j=0;j<clouds.length;j++){
            const intersection=getIntersection(this.receptors[i][0],this.receptors[i][1],clouds[j].points,clouds[h][(j+1)%poly.length])
        }*/
        let touch=false;
        clouds=[]
        clouds.forEach(x=>{

            for(let j=0;j<x.points.length;j++){
                const value=getIntersection(
                    this.receptors[4][0],
                    this.receptors[4][1],
                    x.points[j],
                    x.points[(j+1)%poly.length]
                );
                if(value){
                    touch=true
                }
        }})
        if(touch){
            document.querySelector('body').innerHTML='';
        }
    }

    draw(ctx){
        for(let i=0; i<this.receptors.length;i++){
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="cyan";
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



function lerp(A,B,t){
    return A+(B-A)*t
}

function getIntersection(A,B,C,D){ 
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
    
    if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }

    return null;
}

function polysIntersect(poly1, poly2){
    for(let i=0;i<poly1.length;i++){
        for(let j=0;j<poly2.length;j++){
            const touch=getIntersection(
                poly1[i],
                poly1[(i+1)%poly1.length],
                poly2[j],
                poly2[(j+1)%poly2.length]
            );
            if(touch){
                return true;
            }
        }
    }
    return false;
}