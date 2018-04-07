class Counter {
	constructor(min, max, element, btnDecrement, btnIncrement) {

		// declare member variables
		this.element = document.querySelector(element);
		this.btnDecrement = document.querySelector(btnDecrement);
		this.btnIncrement = document.querySelector(btnIncrement);
		this.min = min;
		this.max = max;
		this.value = 0;

		// add event listeners
		this.btnDecrement.addEventListener('click', this.decrement.bind(this));
		this.btnIncrement.addEventListener('click', this.increment.bind(this));

		// update once immediately
		this.update();
	}

	increment() {
		// increment value
		if (this.value < this.max) this.value ++;
		this.update();
	}

	decrement() {
		// decrement value
		if (this.value > this.min)this.value --;
		this.update();
	}

	update() {
		// update counter element
		this.element.innerHTML = `Counter: ${this.value}`;

		// disable buttons when min / max is reached
		if (this.value === 0) {
			this.btnDecrement.setAttribute('disabled', true);
		} else if (this.value === this.max) {
			this.btnIncrement.setAttribute('disabled', true);
		} else {
			this.btnDecrement.removeAttribute('disabled');
			this.btnIncrement.removeAttribute('disabled');
		}

		this.onUpdate(this.value);
	}

	onUpdate() {} // placeholder method
}
