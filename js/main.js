// entry point
function main() {

	// list of repos
	let repos = [
		'eslint/eslint',
		'oakwood/front-end-questions',
		'babel/babel',
		'webpack/webpack',
		'storybooks/storybook',
		'facebook/react',
		'reactjs/redux',
		'expressjs/express'
	];

	// get references to elements
	const btnDecrement = document.querySelector('#btn-decrement');
	const btnIncrement = document.querySelector('#btn-increment');
	const btnOpenLogin = document.querySelector('#btn-open-login');
	const btnCloseLogin = document.querySelector('#btn-authorize-form-close');
	const btnLogin = document.querySelector('#btn-login');
	const overlay = document.querySelector('#overlay');
	const loginPopup = document.querySelector('#authorize-popup');

	// create an instance of Counter(min, max, counter element, decrement button, increment button)
	let counter = new Counter(0, repos.length - 1, '#counter', '#btn-decrement', '#btn-increment');

	// create an instance of RepoInformation(repos, name element, description element, stars element)
	let repoInformation = new RepoInformation(repos, '#repo-name', '#repo-description', '#repo-stars');

	// add event listeners
	btnOpenLogin.addEventListener('click', showLoginPopup);
	btnCloseLogin.addEventListener('click', closeLoginPopup);
	btnLogin.addEventListener('click', authorize);

	// hide some elements initially
	hide(btnOpenLogin);

	// update repo information whenever counter changes
	counter.onUpdate = repoInformation.update.bind(repoInformation);

	// show login button if repo info failed to fetch because of authorization issues
	repoInformation.onUnauthorized = showLoginButton;

	// this shows the login button when user needs to log in to continue
	function showLoginButton() {
		show(btnOpenLogin);
	}

	function hideLoginButton() {
		hide(btnOpenLogin);
	}

	// show login popup
	function showLoginPopup() {
		show([loginPopup, overlay]);
	}

	// close login popup
	function closeLoginPopup() {
		hide([loginPopup, overlay]);
	}

	// simple authorization against github
	function authorize() {
		let username = document.forms[0].elements[0].value;
		let password = document.forms[0].elements[1].value;
		repoInformation.authorize.call(repoInformation, username, password);
		closeLoginPopup();
		hideLoginButton();
	}

	function hide(elements) {
		// convert to array if it's not
		let elementsArray = elements.constructor === Array ? elements : [elements];
		elementsArray.forEach(element => {
			element.style.display = "none";
		});
	}

	function show(elements) {
		// convert to array if it's not
		let elementsArray = elements.constructor === Array ? elements : [elements];
		elementsArray.forEach(element => {
			element.style.display = "initial";
		});
	}
}
