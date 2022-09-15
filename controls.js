class Controls {
    constructor(){
        this.headDown=false;
        this.right=false;
        this.left=false;
        this.#initControls();
    }
    
    #initControls(){
        document.onkeydown=(e)=>{
            switch(e.key){
                case 'a':
                    this.left=true;
                    break;
                case 'd':
                    this.right=true;
                    break;
                case 's':
                    this.headDown=true;
                    break;
            }
        }
        document.onkeyup=(e)=>{
            switch(e.key){
                case 'a':
                    this.left=false;
                    break;
                case 'd':
                    this.right=false;
                    break;
                case 's':
                    this.headDown=false;
                    break;
            }
        }
    }
    
}