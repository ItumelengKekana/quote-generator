import "./App.css";
import { useState, useEffect } from "react";
import { Twitter, Quote } from "react-bootstrap-icons";

function App() {
	const [quote, setQuote] = useState("");
	const [author, setAuthor] = useState("");

	//set background colour of the elements
	const setBg = () => {
		//generate a random colour and assign it to the body element code from (https://css-tricks.com/snippets/javascript/random-hex-color/)

		const randomColor = Math.floor(Math.random() * 16777215).toString(16);

		document.body.style.backgroundColor = "#" + randomColor;

		const text = document.querySelector("#text");
		const auth = document.querySelector("#author");
		const but = document.querySelectorAll(".button");

		//assign a colour to each button in this class (always use a loop)
		but.forEach((btn) => {
			btn.style.backgroundColor = "#" + randomColor;
		});

		//assign the same colour to the text and author
		text.style.color = "#" + randomColor;
		auth.style.color = "#" + randomColor;
	};

	//fetch a quote from the endpoint and set the colours appropriately
	const getQuote = async () => {
		const endpoint = "https://api.quotable.io/random?limit=1";

		const response = await fetch(endpoint, {
			method: "GET",
			mode: "cors",
		});

		const json = await response.json();
		
		setQuote(json.content);
		setAuthor(json.author);

		setBg();
	};

	//lifecycle
	useEffect(() => {
		getQuote();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//declare url for the tweet
	const twitterURL = `https://twitter.com/intent/tweet?hashtags=quotes&text=${quote}-${author}`;

	return (
		<div className="App">
			<div className="container" id="quote-box">
				<div className="quote-text">
					<p id="text">
						<Quote />
						{quote}
					</p>
				</div>
				<h3 id="author">-{author}</h3>
				<a
					href={twitterURL}
					id="tweet-quote"
					className="button"
					target="_blank"
					rel="noreferrer"
				>
					<Twitter />
				</a>
				<button
					id="new-quote"
					className="button"
					onClick={() => getQuote()}
				>
					New Quote
				</button>
			</div>
		</div>
	);
}

export default App;
