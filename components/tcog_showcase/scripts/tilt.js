import { getMousePos } from './mousePosition.js'

export const tilt = (e, dom) => {
	const animatable = {
		image: { translation: { x: -20, y: -10, z: 0 }, rotation: { x: 0, y: 0, z: 3 } },
		shadow: { translation: { x: 30, y: 20, z: 0 }, rotation: { x: 0, y: 0, z: -2 } },
		title: { translation: { x: 20, y: -20, z: 0 }, rotation: { x: 0, y: 0, z: 2 } },
	}
	const mousepos = getMousePos(e)
	const docScrolls = {
		left: document.documentElement.scrollLeft,
		top: document.documentElement.scrollTop,
	}
	const bounds = dom.container.getBoundingClientRect()
	const relMousePos = {
		x: mousepos.x - bounds.left - docScrolls.left,
		y: mousepos.y - bounds.top - docScrolls.top,
	}

	for (let key in dom) {
		if (key === 'container') continue

		gsap.to(dom[key], {
			duration: 2.5,
			ease: 'power2.out',
			x: 2 * animatable[key].translation.x * (relMousePos.x / bounds.width) - animatable[key].translation.x,
			y: 2 * animatable[key].translation.y * (relMousePos.y / bounds.height) - animatable[key].translation.y,
			z: 0,
			rotationX: 0,
			rotationY: 0,
			rotationZ: 2 * animatable[key].rotation.z * (relMousePos.x / bounds.width) - animatable[key].rotation.z,
		})
	}
}
