import { url } from './credentials.js'

const runCode = (url, locate = "head") => {
  const script = document.createElement('script')
  script.src = url
  script.type = 'module'
  if(locate === "body") script.setAttribute("defer", '')
  document.head.appendChild(script)   
}

const fetchData = async () => {
  if(!window.showcaseData){
		const resp = await fetch(url)
    window.showcaseData = await resp.json()
    runCode("./tcog-showcase.js")
    runCode("./tcog-overlay.js")
    runCode("./app.js", "body")
	}	
}
fetchData()
