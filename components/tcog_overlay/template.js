import Icon from './scripts/icon.js'

export default {
  render(){
    return `${this.html()}
            ${this.css()}`
  },
  mapDOM(scope){
    return{
      overlay: scope.getElementById('overlay'),
      reveal: scope.getElementById('reveal'),
      item: scope.getElementById('item'),
      close: scope.getElementById('close'),
      container: scope.getElementById('gl'),
      title: scope.getElementById('title'),
      count: scope.getElementById('count')
    }
  },
  html(){
    return `
<div id='overlay'>
<div id='reveal'></div>
<div id='item'>
<h1 id='title'></h1>
<div id="gl"></div>                 
<button id="close">${Icon.iconCross()}</button>
<h2 id="count"></h2>   
</div>
</div>
    `
  },
  css(){
    return `
<style>
#overlay {
pointer-events: none;
width: 100%;
height: 100vh;
position: fixed;
top: 0;
left: 0;
z-index: 1000;
overflow: hidden;
}
#icon-cross {
display: block;
width: 1.5em;
height: 1.5em;
margin: 0 auto;
fill: var(--text-color);
}     
.open {
pointer-events: auto !important;
}
#count {
position: absolute;
top: .5rem;
left: 1rem;
color: var(--text-color);
}
#title {
height: 2rem;
color: var(--text-color);        
}        
#close {          
cursor: pointer;
border: 0;
width: 2.5rem;
height: 2.5rem;
position: absolute;
top: 1rem;
right: 1rem;
background: none;          
opacity: 0;
}
#close:focus {
outline: none;
}
#reveal {
width: 100%;
height: 100%;
top: 0;
left: 0;
background: #000;
position: absolute;
z-index: 100;
transform: translateX(100%)
}
#item {
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
height: 100vh;          
/*background: var(--base-color);*/
background-image: radial-gradient(#596657, #364435);
opacity: 0;
}        
#gl {
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
height: calc(100vh - 3rem);
margin-bottom: .5rem;     
}
canvas {
  box-shadow: 4px 4px 16px rgba(0,0,0,0.5);              
}
</style>
`
  }
}