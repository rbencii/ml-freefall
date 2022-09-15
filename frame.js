const gameCanvas = document.querySelector('#gameLayer')
gameCanvas.width=500;
gameCanvas.height=900;
const gameContext = gameCanvas.getContext('2d');

const testFaller = new FreeFaller(250,100);

function animate(){
    
    testFaller.animate();
    gameCanvas.height=window.innerHeight;
    testFaller.draw(gameContext)
    requestAnimationFrame(animate);
}
animate();