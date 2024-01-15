import './App.css';
import { useState, useEffect } from 'react';
import { Base64 } from 'js-base64'

function App() {
	const [quote, setQuote] = useState("");
	const [author, setAuthor] = useState("");
	const [results, setResults] = useState([]);
	const [authToken, setToken] = useState();

	//set background colour to the elements
	const setBg = () => {
		//generate a random colour and assign it to the body element code from (https://css-tricks.com/snippets/javascript/random-hex-color/)

		const randomColor = Math.floor(Math.random() * 16777215).toString(16);

		document.body.style.backgroundColor = "#" + randomColor;

		const text = document.querySelector('#text');
		const auth = document.querySelector('#author');
		const but = document.querySelectorAll('.button');

		//assign a colour to each button in this class (always use a loop)
		but.forEach(btn => {
			btn.style.backgroundColor = '#' + randomColor;
		})

		//assign the same colour to the text and author
		text.style.color = '#' + randomColor;
		auth.style.color = '#' + randomColor;

	}

	//fetch a quote from the endpoint and set the colours appropriately
	const getQuote = async () => {
		const endpoint = 'https://goquotes-api.herokuapp.com/api/v1/random?count=1';

		const response = await fetch(endpoint);

		const json = await response.json();
		console.log(json);

		setResults(json.quotes[0]);
		setQuote(results.text);
		setAuthor(results.author);

		setBg();
	}

	const bAuth = Base64.encode(`4cj7l7nihec6bvv1shmo75jaad:dgarctpkp4f4c3r4vcurat5gc6ic0ntd42ecofhccu9j0osdof6`).toString()

	const formData = new FormData();

	formData.append('client_id', '4cj7l7nihec6bvv1shmo75jaad')
	// formData.append('client_secret', process.env.KINEKTEK_SECRET)
	formData.append('grant_type', 'client_credentials')
	// formData.append('scope', 'users/write')

	const tokenObject = {
		method: 'POST',
		headers: new Headers({
			'Accept': '*/*, application/json',
			'Authorization': `Basic ${bAuth}`,
			'Content-Type': 'application/x-www-form-urlencoded',
			'Host': 'orca-party-testbed.auth.eu-west-1.amazoncognito.com',
		}),
		body: new URLSearchParams(formData),
		json: true
	}


	const tokenUrl = 'https://orca-party-testbed.auth.eu-west-1.amazoncognito.com/oauth2/token';

	const fetchToken = async () => {
		let token = await fetch(tokenUrl, tokenObject)

		if (!token) {
			console.log(token.status);
			throw Error(token.statusText);
		}

		const json = await token.json();

		setToken(json);
		console.log(authToken);
	}

	//lifecycle
	useEffect(() => {
		getQuote();
		fetchToken();
	}, [])

	//declare url for the tweet
	const url = `https://twitter.com/intent/tweet?hashtags=quotes&text=${quote}-${author}`;


	return (
		<div className="App">
			<div className="container" id="quote-box">
				<div className="quote-text">
					<p id="text"><span>"</span>{quote}<span>"</span></p>
				</div>
				<h3 id="author">-{author}</h3>
				<a href={url} id="tweet-quote" className="button" target="_blank" rel='noreferrer'>Tweet</a>
				<button id="new-quote" className="button" onClick={getQuote}>New Quote</button>
			</div>
		</div>
	);
}

export default App;
