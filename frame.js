const gameCanvas = document.querySelector('#gameLayer')
gameCanvas.width=500;
gameCanvas.height=900;
const gameContext = gameCanvas.getContext('2d');

const testFaller = new FreeFaller(250,100);





const perfectFrameTime = 1000 / 60;
let deltaTime = 0;
let lastFrame = 0;

function animate(){
    let currentFrame = performance.now();
    deltaTime = (currentFrame - lastFrame) / perfectFrameTime;
    lastFrame = currentFrame;

    console.log(deltaTime);
    testFaller.animate(deltaTime);
    gameCanvas.height=window.innerHeight;
    testFaller.draw(gameContext)
    requestAnimationFrame(animate);
}
animate();