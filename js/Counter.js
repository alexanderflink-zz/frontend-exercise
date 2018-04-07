class Counter {
	constructor(min, max, element) {

		// declare member variables
		this.element = document.querySelector(element);
		this.min = min;
		this.max = max;
		this.value = 0;

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
		this.onUpdate(this.value);
	}

	onUpdate() {} // placeholder method
}
