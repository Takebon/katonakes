
export default {
  render(img, title){
    return `${this.css()}
            ${this.html(img, title)}`
  },
  mapDom(scope){
    return {
      image: scope.getElementById('image'),
      shadow: scope.getElementById('shadow'),
      title: scope.getElementById('title'),
      container: scope.getElementById('container')
    }
  },
  html(img, title){
    return `
<div id="container">
<div id="wrapper">
<div id="shadow"></div>
<img id="image" src=${img}>
<h3 id="title"><spam id="title-inner" data-hover="${title}">${title}</spam></h3>
</div>
</div>
`
  },
  css(){
    return `
<style>         
#container {
display: flex; 
align-items: center;
justify-content: center;
height: 18rem; 
}

#wrapper {          
position: relative;
height: 150px;
width: 200px;
display: flex; 
align-items: center;
justify-content: center;
}         
#shadow {
position: absolute;
z-index: 10;         
top: -.5rem;
left: 1.5rem;
width: 200px;
height: 148px;
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAOklEQVQoU43MSwoAMAgD0eT+h7ZYaOlHo7N+DNHL2HAGgBWcyGcKbqTghTL4oQiG6IUpOqFEC5bI4QD8PAoKd9j4XwAAAABJRU5ErkJggg==);
}
#image {
z-index: 10;
position: absolute;
top: -2rem;
pointer-events: none;
display: block;
flex: none;
margin: 0 auto;          
filter: grayscale(1);
transition: filter 0.3s;
box-shadow: 2px 2px 5px 8px rgba(0,0,0,0.3)
}        
#container:hover #image {          
filter: grayscale(0);
}        
#title {          
z-index: 100;
line-height: 1;
margin: 0;          
position: absolute;
top: -2rem;
right: -3.5rem;
-webkit-writing-mode: vertical-rl;
writing-mode: vertical-rl;
}
#title-inner {                
display: block;
position: relative;
font-weight: normal;
font-size: 2.5rem;
letter-spacing: 0.15rem;
line-height: 1.25;
font-family: 'Anton', sans-serif;         
}
#title-inner[data-hover] {
-webkit-text-stroke: 2px #000;          
-webkit-text-fill-color: transparent;          
color: transparent;
}
#title-inner::before {
content: attr(data-hover);
position: absolute;
top: 0;
left: 0;
height: 0;         
overflow: hidden;
white-space: nowrap;
-webkit-text-stroke: 0;         
-webkit-text-fill-color: var(--text-color);   
color: #000;     
transition: all 0.3s;
}
#container:hover #title-inner::before {
height: 100%;
width: 100%;        
}

:host([straight]) #title {
top: -3rem;
right: 2rem;      
-webkit-writing-mode: horizontal-tb;
writing-mode: horizontal-tb;
}
:host([straight]) #title-inner::before {
height: auto;
width: 0;
}
:host([straight]) #image {
top: 0;         
}
:host([straight]) #shadow {
top: -1.5rem;
left: -1rem;
}
:host([bottom]) #image {
top: -3.5rem;         
}
:host([bottom]) #title {
top: 6rem;
right: 2rem;      
-webkit-writing-mode: horizontal-tb;
writing-mode: horizontal-tb;
}
:host([bottom]) #shadow {
top: -2.5rem;
left: -1rem;
}
:host([bottom]) #title-inner::before {
height: auto;
width: 0;
}
@media screen and (max-width: 60rem) {
#image {
filter: grayscale(0);            
}
#title-inner[data-hover] {
-webkit-text-stroke: 1px #000;          
-webkit-text-fill-color: var(--text-color);          
color: var(--text-color);
}
#title-inner::before {
height: 100%;
width: 100%;        
}
:host([straight]) #title {
top: -4rem;
left: 1rem;
}
}

</style>
`
}
}