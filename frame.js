const gameCanvas = document.querySelector('#gameLayer')
gameCanvas.width=500;
gameCanvas.height=900;
const gameContext = gameCanvas.getContext('2d');

const testFaller = new FreeFaller(250,100);





const perfectFrameTime = 1000 / 60;
let deltaTime = 0;
let lastFrame = 0;

let testCloud = new Cloud(Math.floor(Math.random()*(gameCanvas.width-200)+100),gameCanvas.height);

function animate(){
    let currentFrame = performance.now();
    deltaTime = (currentFrame - lastFrame) / perfectFrameTime;
    lastFrame = currentFrame;
    if(testCloud.isDead)
        testCloud = new Cloud(Math.floor(Math.random()*(gameCanvas.width-200)+100),gameCanvas.height);
    testCloud.animate(deltaTime);
    testFaller.animate(deltaTime);
    gameCanvas.height=window.innerHeight;
    testCloud.draw(gameContext)
    testFaller.draw(gameContext)
    requestAnimationFrame(animate);
}
animate();