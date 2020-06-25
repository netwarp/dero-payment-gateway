//import { rollup } from 'rollup'
import html from 'rollup-plugin-html'
import scss from 'rollup-plugin-scss'
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
	input: 'src/main.js',
	output: [
		{
			file: './dest/bundle.js',
			format: 'iife',
			name: 'DeroPayment'
		},
	],
	plugins: [
		resolve({
			browser: true,
		}),
		commonjs({
			include: 'node_modules/**'
		}),
		html({
			include: 'src/template.html'
		}),
		scss({
			output: './dest/bundle.css',
			outputStyle: "compressed",
		})
	]
};