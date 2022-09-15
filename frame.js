const gameCanvas = document.querySelector('#gameLayer')
gameCanvas.width=500;
gameCanvas.height=900;
const gameContext = gameCanvas.getContext('2d');

const testFaller = new FreeFaller(250,100);





const perfectFrameTime = 1000 / 60;
let deltaTime = 0;
let lastFrame = 0;

let testClouds = [];
for(let i=0;i<3;i++){
    testClouds[i] = new Cloud(Math.floor(Math.random()*(gameCanvas.width-200)+100),Math.floor(Math.random()*500+400));
}

function animate(){
    let currentFrame = performance.now();
    deltaTime = (currentFrame - lastFrame) / perfectFrameTime;
    lastFrame = currentFrame;
    testClouds.forEach((x,i)=>{if(x.isDead())testClouds[i]=new Cloud(Math.floor(Math.random()*(gameCanvas.width-200)+100),900)})
    testClouds.forEach(x=>x.animate(deltaTime));
    testFaller.animate(deltaTime);
    gameCanvas.height=window.innerHeight;
    testClouds.forEach(x=>x.draw(gameContext));
    testFaller.draw(gameContext);
    requestAnimationFrame(animate);
}
animate();