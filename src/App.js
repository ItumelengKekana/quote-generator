import './App.css';
import {useState, useEffect} from 'react';

function App() {
	const [quote, setQuote] = useState("");
	const [author, setAuthor] = useState("");
	const [results, setResults] = useState([]);

	const setBg = () => {
		const randomColor = Math.floor(Math.random()*16777215).toString(16);
		document.body.style.backgroundColor = "#" + randomColor;

		const text = document.querySelector('#text');
		const auth = document.querySelector('#author');
		const but = document.querySelector('.button');

		text.style.color = '#' + randomColor;
		auth.style.color = '#' + randomColor;
		but.style.backgroundColor = '#' + randomColor;

	  }

	const getQuote = async() =>{
		const endpoint = 'https://goquotes-api.herokuapp.com/api/v1/random?count=1';

		const response = await fetch(endpoint);

		const json = await response.json();
		console.log(json);

		setResults(json.quotes[0]);
		setQuote(results.text);
		setAuthor(results.author);

		setBg();
	}

	const url = `twitter.com/intent/tweet?hashtags=quotes&text=${quote}-${author}`;

  return (
	<div className="App">
	  <div className="container" id="quote-box">
		<div className="quote-text">
			<p id="text"><span>"</span>{quote}<span>"</span></p>
		</div>
		<h3 id="author">-{author}</h3>
		<a href={url} id="tweet-quote" className="button" target="_blank">Tweet</a>
		<button id="new-quote" className="button" onClick={getQuote}>New Quote</button>
	  </div>
	</div>
  );
}

export default App;
