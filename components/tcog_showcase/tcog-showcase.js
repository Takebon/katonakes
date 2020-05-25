import Template from './template.js'
import MouseHandler from './scripts/mouseHandler.js'

class Showecase extends HTMLElement {
	constructor() {
		super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.enter = false
    this.allowTilt = true
	}

	connectedCallback() {
		let img = null
		let text = null
		if (this.hasAttribute('img')) {
			img = this.getAttribute('img')
		} else {
		}
		if (this.hasAttribute('text')) {
			text = this.getAttribute('text').toUpperCase()
		} else {
		}
		this.shadow.innerHTML = Template.render(img, text)
    this.dom = Template.mapDom(this.shadowRoot)    
		this.setListeners()
	}

	setListeners() {
		this.dom.container.addEventListener('mouseenter', MouseHandler.mouseenterFn.bind(this))
		this.dom.container.addEventListener('mousemove', MouseHandler.mousemoveFn.bind(this))
		this.dom.container.addEventListener('mouseleave', MouseHandler.mouseleaveFn.bind(this))	
		this.addEventListener('click', e => {
			e.preventDefault()
			const customEvent = new CustomEvent('showOverlay', {
				bubbles: true,
				composed: true,
				detail: {
					id: this.getAttribute('id'),
					text: this.getAttribute('text')}
			})
			this.shadow.dispatchEvent(customEvent)
		})
	}
}

if (!customElements.get('tcog-showcase')) {
	customElements.define('tcog-showcase', Showecase)
}
