const grid = document.querySelector('.grid')

const fetchData = () => {	
  window.showcaseData.documents.forEach(doc => {
    const showeCaseItem = document.createElement('tcog-showcase')
    showeCaseItem.setAttribute('id', doc.fields.id.stringValue)
    showeCaseItem.setAttribute('img', doc.fields.img.stringValue)
    showeCaseItem.setAttribute('text', doc.fields.text.stringValue)
    grid.appendChild(showeCaseItem)
  })
  runApp()
}

const runApp = () => {
	const overlay = document.querySelector('tcog-overlay')
	const showcaseItems = document.querySelectorAll('tcog-showcase')
	let screenSize = ''

	grid.addEventListener('showOverlay', (e) => {
		overlay.setAttribute('text', e.detail.text)
		overlay.setAttribute('showcase', e.detail.id)
		overlay.open()
	})

	const getRandomInt = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min
	}

	const resize = () => {
		let oldScreenSize = screenSize
		if (window.innerWidth < 800) {
			screenSize = 'small'
			if (oldScreenSize !== screenSize) {
				for (let node of showcaseItems) {
					if (node.hasAttribute('bottom')) node.removeAttribute('bottom')
					if (!node.hasAttribute('straight')) node.setAttribute('straight', '')
				}
			}
		} else {
			screenSize = 'high'
			if (oldScreenSize !== screenSize) {
				for (let node of showcaseItems) {
					const random = getRandomInt(0, 2)
					if (random === 1 && !node.hasAttribute('bottom')) node.setAttribute('bottom', '')
					if (random === 2) node.removeAttribute('straight')
				}
			}
		}
	}
	resize()
	window.addEventListener('resize', resize)
}
fetchData()