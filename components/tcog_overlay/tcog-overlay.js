import Template from './template.js'
import Slider from './scripts/Slider.js'

class Overlay extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
		this.urls = {}
	}

	getURLs() {
		window.showcaseData.documents.forEach((doc) => {
			let data = []
			doc.fields.images.arrayValue.values.forEach((val) => {
				data.push(val.stringValue)
			})
			this.urls[doc.fields.id.stringValue] = data
		})
	}

	connectedCallback() {
		this.shadowRoot.innerHTML = Template.render()
		this.dom = Template.mapDOM(this.shadowRoot)
		this.getURLs()
		this.slider = new Slider(this.dom, this.urls)
		this.dom.close.addEventListener('click', () => this.close())
	}

	static get observedAttributes() {
		return ['showcase']
	}

	attributeChangedCallback(name, oldVal, newVal) {
		if (newVal) {
			this.text = this.getAttribute('text').toUpperCase()
			this.dom.title.innerText = this.text
			this.slider.runSlider(newVal)
		}
	}

	open() {
		this.dom.overlay.classList.add('open')
		gsap.to(this.dom.reveal, {
			duration: 0.5,
			ease: 'Power1.easeInOut',
			x: '0%',
			onComplete: () => {
				document.body.style.overflow = 'hidden'
				this.revealItem()
				gsap.to(this.dom.reveal, {
					duration: 0.5,
					ease: 'Power1.easeInOut',
					x: '-100%',
				})
			},
		})
	}

	revealItem() {
		this.dom.item.style.opacity = 1
		this.dom.close.style.opacity = 1
	}

	hideItem() {
		this.dom.item.style.opacity = 0
		this.dom.close.style.opacity = 0
	}

	close() {
		this.slider.isOpened = false
		gsap.to(this.dom.reveal, {
			duration: 0.5,
			ease: 'Power1.easeInOut',
			x: '0%',
			onComplete: () => {
				document.body.style.overflow = ''
				this.hideItem()
				gsap.to(this.dom.reveal, {
					duration: 0.5,
					ease: 'Power1.easeInOut',
					x: '100%',
					onComplete: () => {
						this.dom.overlay.classList.remove('open')
					},
				})
			},
		})
	}
}

if (!customElements.get('tcog-overlay')) {
	customElements.define('tcog-overlay', Overlay)
}
