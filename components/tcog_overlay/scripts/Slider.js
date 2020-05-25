import Shaders from './shaders.js'
import Uniform from './Uniform.js'
import Rect from './Rect.js'

export default class Slider {
	constructor(dom, urls) {
		this.dom = dom
		this.urls = urls
		this.images = null
		this.textures = []
		this.loadedImages = null
		this.canvas = document.createElement('canvas')
		this.dom.container.appendChild(this.canvas)
		this.gl = this.canvas.getContext('webgl')
		this.createScene()
		this.loadImages()
		this.dom.container.addEventListener('click', () => {
			if (this.isRunning) return
			this.isRunning = true
		})
		this.imagesLoaded = false
	}

	setStart() {
		this.tick = 0
		this.current = 0
		this.length = 0
		this.startTime = new Date().getTime()
		this.progress = { value: 0 }
		this.textures = []
		this.tick = 0
		this.current = 0
		this.isOpened = true
	}

	createScene() {
		this.program = this.gl.createProgram()
		this.addShader(Shaders.vertexShader(), this.gl.VERTEX_SHADER)
		this.addShader(Shaders.fragmentShader(), this.gl.FRAGMENT_SHADER)
		this.gl.linkProgram(this.program)
		this.gl.useProgram(this.program)

		this.uResolution = new Uniform('resolution', '4f', this.program, this.gl)
		this.uTime = new Uniform('time', '1f', this.program, this.gl)
		this.uRatio = new Uniform('pixelRatio', '1f', this.program, this.gl)
		this.uProgress = new Uniform('progress', '1f', this.program, this.gl)

		this.billboard = new Rect(this.gl)
		const positionLocation = this.gl.getAttribLocation(this.program, 'a_position')
		this.gl.enableVertexAttribArray(positionLocation)
		this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0)
	}

	addShader(source, type) {
		const shader = this.gl.createShader(type)
		this.gl.shaderSource(shader, source)
		this.gl.compileShader(shader)
		const isCompiled = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)
		if (!isCompiled) {
			throw new Error(`Shader compile error: ${this.gl.getShaderInfoLog(shader)}`)
		}
		this.gl.attachShader(this.program, shader)
	}

	loadImages() {
		const f = {}
		let imagesToLoad = 0
		for (let k in this.urls) {
			imagesToLoad += this.urls[k].length
		}
		for (let key in this.urls) {
			f[key] = []

			for (let url of this.urls[key]) {
				const image = new Image()
				image.crossOrigin = ''
				image.addEventListener('load', () => {
					f[key].push(image)
					--imagesToLoad
					if (imagesToLoad === 0) {
						this.images = f
						this.imagesLoaded = true
						const loader = document.querySelector('.loader')
						loader.style.display = 'none'
					}
				})
				image.src = url
			}
		}
	}

	runSlider(subFolder) {
		if (!this.imagesLoaded) return
		this.setStart()
		const images = this.images[subFolder]
		if(!images.length) return
    this.length = images.length
		if(images.length === 1){
			this.length = 1
			images[1] = images[0]
		}
		this.dom.count.innerText = `${this.current + 1} / ${this.length}`
		this.imageAspect = images[0].naturalHeight / images[0].naturalWidth
		for (let i = 0; i < images.length; i++) {
			const texture = this.gl.createTexture()
			this.gl.bindTexture(this.gl.TEXTURE_2D, texture)
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE)
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE)
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR)
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR)
			this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, images[i])
			this.textures.push(texture)
		}
		this.u_image0Location = this.gl.getUniformLocation(this.program, 'image0')
		this.u_image1Location = this.gl.getUniformLocation(this.program, 'image1')

		this.gl.activeTexture(this.gl.TEXTURE0 + 0)
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[0])
		this.gl.uniform1i(this.u_image0Location, 0)

		this.gl.activeTexture(this.gl.TEXTURE0 + 1)
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[1])
		this.gl.uniform1i(this.u_image1Location, 1)

		this.resize()
		this.loop()
	}

	swapTexture() {
		const length = this.textures.length
		const nextTexture = this.textures[(this.current + 1) % length]
		this.gl.activeTexture(this.gl.TEXTURE0 + 0)
		this.gl.bindTexture(this.gl.TEXTURE_2D, nextTexture)
		this.gl.uniform1i(this.u_image0Location, 0)
		this.progress.value = 0
		this.tick = 0
		this.current = (this.current + 1) % length
		this.gl.activeTexture(this.gl.TEXTURE0 + 1)
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[(this.current + 1) % length])
		this.gl.uniform1i(this.u_image1Location, 1)
		this.isRunning = false
		this.dom.count.innerText = `${this.current + 1} / ${this.length}`		
	}

	loop() {
		if (this.isRunning) {
			this.tick += 0.02
			this.progress.value =
				this.tick < 0.5 ? 4 * this.tick * this.tick * this.tick : 1 - Math.pow(-2 * this.tick + 2, 3) / 2 //Math.pow(this.tick, 0.5)
			if (this.progress.value > 1) {
				this.progress.value = 1
				this.swapTexture()
			}
		}
		const now = new Date().getTime()
		const curentTime = (now - this.startTime) / 1000
		this.uTime.set(curentTime)
		this.uProgress.set(this.progress.value)
		this.billboard.render(this.gl)
		if (this.isOpened) {
			requestAnimationFrame(this.loop.bind(this))
		}
	}

	resize() {
		this.resizeHandler()
		window.addEventListener('resize', this.resizeHandler.bind(this))
	}

	resizeHandler() {
		const ratio = window.devicePixelRatio
		let width = this.dom.container.offsetWidth
		let height = this.dom.container.offsetHeight
		const screenAspect = height / width
		if (width > 1125 && height > 832) {
			width = 1125
			height = 832
		} else if (width > 1125 && height < 832) {
			width = height / this.imageAspect
		} else if (width < 1125 && height > 832) {
			height = width * this.imageAspect
		} else if (width < 1125 && height < 832) {
			if (screenAspect > this.imageAspect) {
				height = width * this.imageAspect
			} else {
				width = height / this.imageAspect
			}
		}

		this.canvas.width = width * ratio
		this.canvas.height = height * ratio
		this.canvas.style.width = width + 'px'
		this.canvas.style.height = height + 'px'
		let a1, a2
		if (height / width < this.imageAspect) {
			a1 = 1
			a2 = height / width / this.imageAspect
		} else {
			a1 = (width / height) * this.imageAspect
			a2 = 1
		}
		this.uResolution.set(width, height, a1, a2)
		this.uRatio.set(1 / ratio)
		this.gl.viewport(0, 0, width * ratio, height * ratio)
	}
}
