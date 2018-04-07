class LoadingIndicator {
	constructor(parent) {

		this.element = document.createElement('div');
		this.element.className = 'loading-indicator';
		this.element.innerHTML = '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 105 104.69777"><title>Untitled-1</title><path d="M59.39638,2.66949a50.00764,50.00764,0,1,1-12.294-.18377" fill="#fff" stroke="#231f20" stroke-miterlimit="10" stroke-width="5"/></svg>';
		this.rotation = 0;
		parent.appendChild(this.element);

		// bind update scope once to prevent rebinding on each animationframe
		this.update = this.update.bind(this);

		this.hide();

		requestAnimationFrame(this.update);
	}

	show() {
		this.element.style.display = 'block';
	}

	hide() {
		this.element.style.display = 'none';
	}

	update() {
		this.rotation += 10;
		this.element.style.transform = `rotate(${this.rotation}deg)`;
		requestAnimationFrame(this.update);
	}
}
