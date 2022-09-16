const gameCanvas = document.querySelector('#gameLayer')
gameCanvas.width=500;
gameCanvas.height=900;
const gameContext = gameCanvas.getContext('2d');

const testFaller = new FreeFaller(250,100,gameCanvas);





const perfectFrameTime = 1000 / 60;
let deltaTime = 0;
let lastFrame = 0;

let testClouds = [];
for(let i=0;i<8;i++){
    testClouds[i] = new Cloud(Math.floor(Math.random()*(gameCanvas.width-61)),500+i*175,gameCanvas);
}

function animate(){
    let currentFrame = performance.now();
    deltaTime = (currentFrame - lastFrame) / perfectFrameTime;
    lastFrame = currentFrame;
    testClouds.forEach((x,i)=>{if(x.isDead())testClouds[i]=new Cloud(Math.floor(Math.random()*(gameCanvas.width-61)),Math.max.apply(null,testClouds.map(x=>x.y))+175,gameCanvas)})
    testClouds.forEach(x=>x.animate(deltaTime));
    testFaller.animate(deltaTime);
    gameCanvas.height=window.innerHeight;
    testClouds.forEach(x=>x.draw(gameContext));
    testFaller.draw(gameContext);
    requestAnimationFrame(animate);
}
animate();