const container = document.createElement('div');
container.id = 'container';
document.body.appendChild(container);


await (function(url='dragableWindow.css') {
    return new Promise((resolve)=>{
        let link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.onload = function() {resolve();};
        link.href = url;

        let headScript = document.querySelector('script');
        headScript.parentNode.insertBefore(link, headScript);
    })
})();

class DragableWindow{
    static DragableWindowIntances;
    
    constructor(){
        this.DragableWindowIntances = (this.DragableWindowIntances || 0) + 1;
        this.zIndex = this.DragableWindowIntances+1;

        this.container = (arguments[0] && arguments[0].container)?arguments[0].container:document.body;

        this.window = document.createElement('div');
        this.window.classList.add('dragableWindow');
        this.window.style.zIndex = this.zIndex;
        this.window.id = (arguments[0] && arguments[0].id)?arguments[0].id:'';

        this.windowHeader = document.createElement('div');
        this.windowHeader.classList.add('dragableWindowHeader');
        this.windowHeader.style.backgroundColor = (arguments[0] && arguments[0].color)?arguments[0].color:'#980d0d';

        this.windowHeaderTitle = document.createElement('p');
        this.windowHeaderTitle.classList.add('dragableWindowHeaderTitle');
        this.windowHeaderTitle.innerText = (arguments[0] && arguments[0].title)?arguments[0].title:'Title';

        this.windowBody = document.createElement('div');
        this.windowBody.classList.add('dragableWindowBody');


        this.windowBodyText = document.createElement('p');
        this.windowBodyText.classList.add('dragableWindowBodyText');
         
        this.windowHeader.onmouseover = () => {
            this.window.style.zIndex = 1000;
            this.windowHeader.style.cursor='move'
        };
        this.windowHeader.onmouseleave = () => {
            this.windowHeader.style.cursor='default'; 
            this.windowHeader.onmousemove=null
            this.window.style.zIndex = this.DragableWindowIntances+1;
        };
        this.windowHeader.onmousedown = (e) => {
            
            let mX= e.clientX; 
            let mY= e.clientY;
            const w = this.window.getBoundingClientRect();
            let wX= w.left; 
            let wY= w.top;
            this.windowHeader.onmousemove = (e) => {
                this.window.style.left = `${wX+e.clientX-mX}px`;
                this.window.style.top = `${wY+e.clientY-mY}px`;
            }
        }
        this.windowHeader.onmouseup = () => {this.windowHeader.onmousemove=null}

        this.windowHeader.appendChild(this.windowHeaderTitle);
        this.window.appendChild(this.windowHeader);
        this.windowBody.appendChild(this.windowBodyText);
        this.window.appendChild(this.windowBody);
        this.container.appendChild(this.window);
    }

    /**
     * @param {string} str
     */
    set title(str){
        this.windowHeaderTitle.innerText = str;
    }

    /**
     * @param {string} str
     */
    set color(str){
        this.windowHeader.style.backgroundColor = str;
    }

    /**
     * @param {string} str
     */
    set content(str){
        this.windowBodyText.innerHTML = str;
    }

    get content(){
        return this.windowBodyText.innerHTML;
    }
}

let window2 = new DragableWindow();
window2.title = "Hola Caracola";
window2.color = '#0f0';

let window = new DragableWindow({id:'myWindow',title:'Debug',color:'#0aa',container:container});
window.content = " Hola Caracola";
for (let i=0; i<200; i++)
    window.content += " Hola Caracola";

