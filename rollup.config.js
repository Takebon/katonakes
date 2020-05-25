import { terser } from 'rollup-plugin-terser'

export default [
	{
		input: './components/tcog_showcase/tcog-showcase.js',
		output: [{ file: './dist/tcog-showcase.js', name: 'TcogShowcase', format: 'umd' }],
		plugins: [terser()],
	},
	{
		input: './components/tcog_overlay/tcog-overlay.js',
		output: [{ file: './dist/tcog-overlay.js', name: 'TcogOverlay', format: 'umd' }],
		plugins: [terser()],
	},
]
