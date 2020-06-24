var QRCode = require('qrcode')
var canvas = document.getElementById('canvas')
 
const config = {
	address: 'dETom4Mu5yJ7t3BujwkWUj4DYACZNNByEL9vVbykjigkS6HmSxFfL9zeVwXU7uW3qnbGkrDwNoqgQFhBJH5KwjLN8YCyeRQGsq',
	amount: '2.4',
	minutes: 15
}

document.querySelector('.address').value = config.address
document.querySelector('.amount').innerText = `${config.amount} dero`

QRCode.toCanvas(canvas, config.address, function (error) {
	if (error) console.error(error)
})

function copyMyText() {
	//select the element with the id "copyMe", must be a text box
	var textToCopy = document.getElementById('address')
	//select the text in the text box
	textToCopy.select()
	//copy the text to the clipboard
	document.execCommand('copy')
}

document.querySelector('.address').addEventListener('click', () => {
	copyMyText()
	alertSuccess('copied success')
})


function alertExpire() {
	const div = document.querySelector('.alert')
	div.classList.remove('success')
	div.classList.remove('hide')
	div.classList.add('error')
	div.innerText = 'Payment expired, try again or contact the support'
}

function alertSuccess(message) {
	const div = document.querySelector('.alert')
	div.classList.remove('error')
	div.classList.remove('hide')
	div.classList.add('success')

	div.innerText = message
}

function timer(minutes = 15) {

	if (! minutes) {
		throw 'minutes are required'
	}

	if (minutes < 15) {
		//throw 'minutes must be greater or equal 15'
	}

	let now = new Date()
	let expire = new Date(now)
	expire.setMinutes(now.getMinutes() + minutes)
	
	now = now.getTime()
	expire = expire.getTime()

	const distance_initial = expire - now
	console.log(distance_initial)

	let x = setInterval(() => {
		const very_now = new Date().getTime();
		const distance = expire - very_now;

		let percent = distance * 100 / distance_initial
		percent = 100 - percent

		document.querySelector('.timer-bar').style.width = percent + '%'

		const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
		const seconds = Math.floor((distance % (1000 * 60)) / 1000)

		document.querySelector('.hours').innerText = hours < 10 ? `0${hours}` : hours
		document.querySelector('.minutes').innerText = minutes < 10 ? `0${minutes}` : minutes
		document.querySelector('.seconds').innerText = seconds < 10 ? `0${$seconds}` : seconds

		if (distance < 0) {
			clearInterval(x)
			alertExpire()
		}

	}, 1000)
}

timer(2)






/*
class DeroPayment {

	constructor(object) {
		this.selector = document.querySelector(object.selector)
		this.address = object.address
		this.amount = object.amount
		this.minutes = object.minutes

		this.init()
	}

	init() {
		this.fillContent()
		this.fillQRCode()
		this.copier()
	}

	fillContent() {
		document.querySelector('.address').value = this.address
		document.querySelector('.amount').innerText = `${this.amount} dero`
	}

	fillQRCode() {
		QRCode.toCanvas(canvas, this.address, function (error) {
			if (error) console.error(error)
		})
	}

	copier() {
		function copyMyText() {
			//select the element with the id "copyMe", must be a text box
			var textToCopy = document.getElementById('address')
			//select the text in the text box
			textToCopy.select()
			//copy the text to the clipboard
			document.execCommand('copy')
		}

		document.querySelector('.address').addEventListener('click', () => {
			copyMyText()
		})
	}

	timer() {
		if (! minutes) {
			throw 'minutes are required'
		}

		if (minutes < 15) {
			//throw 'minutes must be greater or equal 15'
		}

		let now = new Date();

		let expire = now.setMinutes(now.getMinutes() + minutes)
		expire = new Date(now)
		expire = expire.getTime()

		let x = setInterval(() => {
			const now = new Date().getTime();
			const distance = expire - now;


			const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
			const seconds = Math.floor((distance % (1000 * 60)) / 1000)

			document.querySelector('.hours').innerText = hours
			document.querySelector('.minutes').innerText = minutes
			document.querySelector('.seconds').innerText = seconds

			console.log(distance, hours, minutes, seconds)

			if (distance < 4) {
				clearInterval(x)
				alertSuccess()
			}

			if (distance < 0) {
				clearInterval(x)
				alertExpire()
			}
		}, 1000)
	}

	alertExpire() {
		const div = document.querySelector('.alert')
		div.classList.remove('success')
		div.classList.add('error')
		div.innerText = 'Payment expired, try again or contact the support'
	}

	alertSuccess() {
		const div = document.querySelector('.alert')
		div.classList.remove('error')
		div.classList.add('success')
		div.innerText = 'Payment accepted, congratulation !'
	}
}

const d = new DeroPayment({
	selector: '.alert',
	address: 'toto'
})

console.log(d)
*/