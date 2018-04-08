class RepoInformation {
	constructor(repos, nameElement, descriptionElement, starsElement) {

		// declare member variables
		this.repos = repos; // list of all repos

		// DOM content
		this.nameElement = document.querySelector(nameElement);
		this.descriptionElement = document.querySelector(descriptionElement);
		this.starsElement = document.querySelector(starsElement);

		// index of current repo
		this.currentIndex = 0;

		// create an instance of LoadingIndicator and parent it to parent node
		this.loadingIndicator = new LoadingIndicator(this.nameElement.parentNode);

		// update once immediately
		this.update(this.currentIndex);
	}

	update(index) {

		// fetch repository information
		this.fetchRepoInformation(this.repos[index]);
		this.currentIndex = index;
	}

	updateView(info) {
		// populate DOM content
		this.nameElement.innerHTML = info.full_name || '';
		this.descriptionElement.innerHTML = info.description || '';
		this.starsElement.innerHTML = info.stargazers_count ? `<span class="material-icons">star</span>${info.stargazers_count}` : '';

		this.loadingIndicator.hide();
	}

	fetchRepoInformation(repo) {
		// create a new async http request
		let req = new XMLHttpRequest();
		req.open('GET', `https://api.github.com/repos/${repo}`, true);
		req.onload = this.onRetrievedInformation.bind(this);
		req.onerror = this.onError.bind(this);

		// if user has authorized, use credentials
		if (this.username && this.password) {
			let auth = btoa(`${this.username}:${this.password}`);
			req.setRequestHeader('Authorization', `Basic ${auth}`);
		}
		req.send(null);

		this.loadingIndicator.show();
	}

	onRetrievedInformation(e) {
		let req = e.target;
		switch (req.status) {
			case 200:
				// successfully retrieved info
				this.updateView(JSON.parse(req.responseText));
			break;
			case 403:
				// 403 Forbidden
				this.updateView({
					full_name: 'Too many requests!',
					description: 'Sorry, you made too many unauthorized requests in the last hour. <br>Please try again later, or...'
				});
				this.onUnauthorized();
			break;
			case 401:
				// 401 Unauthorized
				this.updateView({
					full_name: 'Oops!',
					description: 'Looks like your login credentials are wrong.'
				});
				this.onUnauthorized();
			break;
			default:
				// Repo doesn't exist
				this.updateView({
					full_name: 'Oops!',
					description: `Sorry, repository ${req.responseURL.replace('https://api.github.com/repos/', '')} doesn´t exist. ¯\\_(ツ)_/¯`
				});
			break;
		}
	}

	onError(e) {
		let req = e.target;
		this.updateView({
			full_name: 'Oops!',
			description: 'Something went wrong when fetching data from github!'
		});
	}

	authorize(username, password) {
		this.username = username;
		this.password = password;
		this.update(this.currentIndex);
	}

	onUnauthorized() {} // placeholder method
}
