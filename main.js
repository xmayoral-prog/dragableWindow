const container = document.createElement('div');
container.id = 'container';
document.body.appendChild(container);


// await (function(url='dragableWindow.css') {
//     return new Promise((resolve)=>{
//         let link = document.createElement('link');
//         link.type = 'text/css';
//         link.rel = 'stylesheet';
//         link.onload = function() {resolve();};
//         link.href = url;

//         let headScript = document.querySelector('script');
//         headScript.parentNode.insertBefore(link, headScript);
//     })
// })();



let style = document.createElement('style');
document.head.appendChild(style);
style.sheet.insertRule(`:root {
    --windowHeader-height: 3em;
    }`);

style.sheet.insertRule(`.dragableWindow{
    position : absolute;
    width : 400px;
    height : 300px;
    box-shadow : 10px 10px 5px grey;    
    border: 1px solid #aaa;
    background-color: #ccc
    }`);

style.sheet.insertRule(`.dragableWindowHeader{
    position : absolute;
    top : 0;
    left : 0;
    margin : 0;
    width : 100%;
    height : var(--windowHeader-height);
    background-color : #980d0d;
    cursor: move
    }`);

style.sheet.insertRule(`.dragableWindowResize{
    --rect-size : 1em;
    position : absolute;
    bottom : 0;
    left :  calc(100% - var(--rect-size));
    margin : 0;
    width : var(--rect-size);
    height : var(--rect-size);
    background: rgb(255,255,255);
    background: linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(153,153,153,1) 50%, rgba(0,0,0,1) 100%);
    cursor: nw-resize
    }`);    

style.sheet.insertRule(`.dragableWindowHeaderTitle{
    position : absolute;
    left : 1em;
    color : #fff;
    font-weight : bold;
    user-select : none
    }`);

style.sheet.insertRule(`.dragableWindowBody{
    position : absolute;
    top : var(--windowHeader-height);
    left : 0;
    height : calc(100% - var(--windowHeader-height));
    overflow : auto;
    }`);

style.sheet.insertRule(`.dragableWindowBodyText{
    margin : 1em;    
    }`);


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

        
        this.windowDragableWindowResize = document.createElement('div');
        this.windowDragableWindowResize.classList.add('dragableWindowResize');
         
        this.windowHeader.onmouseover = () => {
            this.window.style.zIndex = 1000;
            
        };
        this.windowHeader.onmouseleave = () => {
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

        this.windowDragableWindowResize.onmouseover = () => {
            this.window.style.zIndex = 1000;
        };
        this.windowDragableWindowResize.onmouseleave = () => {
            this.windowDragableWindowResize.onmousemove=null
            this.window.style.zIndex = this.DragableWindowIntances+1;
        };
        this.windowDragableWindowResize.onmousedown = (e) => {
            let mX= e.clientX; 
            let mY= e.clientY;
            const w = this.window.getBoundingClientRect();
            let wW= w.width; 
            let wH= w.height;
            this.windowDragableWindowResize.onmousemove = (e) => {
                this.window.style.width = `${wW+e.clientX-mX}px`;
                this.window.style.height = `${wH+e.clientY-mY}px`;
            }
        }
        this.windowDragableWindowResize.onmouseup = () => {this.wwindowDragableWindowResize.onmousemove=null}

        this.windowHeader.appendChild(this.windowHeaderTitle);
        this.window.appendChild(this.windowHeader);
        this.windowBody.appendChild(this.windowBodyText);
        this.window.appendChild(this.windowBody);
        this.window.appendChild(this.windowDragableWindowResize);
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


