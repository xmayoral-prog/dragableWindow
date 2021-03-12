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

const window = document.createElement('div');
window.classList.add('dragableWindow');

const windowHeader = document.createElement('div');
windowHeader.classList.add('dragableWindowHeader');

const windowHeaderTitle = document.createElement('p');
windowHeaderTitle.classList.add('dragableWindowHeaderTitle');
windowHeaderTitle.innerText = 'Title';

const windowBody = document.createElement('div');
windowBody.classList.add('dragableWindowBody');


const windowBodyText = document.createElement('p');
windowBodyText.classList.add('dragableWindowBodyText');
let t = 'Hola Caracola,';
for (let i=0; i<200; i++)
    t += 'Hola Caracola,';
windowBodyText.innerHTML = t;






windowHeader.onmouseover = () => {windowHeader.style.cursor='move'};
windowHeader.onmouseleave = () => {windowHeader.style.cursor='default'; windowHeader.onmousemove=null};
windowHeader.onmousedown = (e) => {
    let mX= e.clientX; 
    let mY= e.clientY;
    const w = window.getBoundingClientRect();
    let wX= w.left; 
    let wY= w.top;
    windowHeader.onmousemove = (e) => {
        const p = window.getBoundingClientRect();
        
        window.style.left = `${wX+e.clientX-mX}px`;
        window.style.top = `${wY+e.clientY-mY}px`;
    }
}
windowHeader.onmouseup = () => {windowHeader.onmousemove=null}


windowHeader.appendChild(windowHeaderTitle);
window.appendChild(windowHeader);
windowBody.appendChild(windowBodyText);
window.appendChild(windowBody);
container.appendChild(window);