import { tilt } from './tilt.js'

export default {
	mouseenterFn() {
		if (this.enter) {
			this.enter = false
		}
		clearTimeout(this.mouseTime)
		this.mouseTime = setTimeout(() => (this.enter = true), 0)
	},
	mousemoveFn(e) {
		if (!this.allowTilt) return
		tilt(e, this.dom)
	},
	mouseleaveFn() {
		if (!this.enter || !this.allowTilt) return
		this.enter = false
		clearTimeout(this.mouseTime)
		for (let key in this.dom) {
			if (key === 'container') continue
			gsap.to(this.dom[key], {
				duration: 2.5,
				ease: 'power2.out',
				x: 0,
				y: 0,
				z: 0,
				rotationX: 0,
				rotationY: 0,
				rotationZ: 0,
			})
		}
	},
}
