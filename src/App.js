import React, {useState,useEffect} from 'react';
import './App.scss';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
  ]



  const [quoteBank,setQuoteBank] = useState([
    {
      text:"Good day Mate ! Click the button to generate a quote !",
      author: "Sean Liu"
    }]);
  const [randomIndex,setRandomIndex] = useState(0);
  const [quote,setQuote] = useState(quoteBank[randomIndex].text);
  const [author,setAuthor] = useState(quoteBank[randomIndex].author);
  const [color,setColor] = useState("#282c34")
  useEffect(
    async () => {
        const result = await axios(
          "https://type.fit/api/quotes",
        );
        setQuoteBank(result.data);
    }
  );

  const getRandomQuote = () => {
    let randomNum = Math.floor(colors.length * Math.random());
    setRandomIndex(Math.floor(quoteBank.length * Math.random()));
    setQuote(quoteBank[randomIndex].text);
    if(quoteBank[randomIndex].author === null ){
      setAuthor("unknown");
    }else{
      setAuthor(quoteBank[randomIndex].author);
    }
    setColor(colors[randomNum]);
  }
  const encodeLink = encodeURIComponent(quote + '"'+"\r-" + author);
  const tweetLink = "https://twitter.com/intent/tweet?text=\"" + encodeLink;
  return (
    <div className="App" id="quote-box">
      <div className="App-content" style={{backgroundColor: color, color: color}}>
        <div className="card container mb-3">
          <div className="card-header">
            Random Quote Machine
          </div>
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p id="text">
              <i class="bi bi-quote"></i> {quote}
              </p>
              <footer className="blockquote-footer" id="author" style={{color: color,opacity: 0.6}}>{author}</footer>
            </blockquote>
          </div>
          <div className="row mb-2" >
            <div className="col">
              <a href={tweetLink} id="tweet-quote" target="_blank"><i className="bi bi-twitter" style={{color: color}}></i></a>
            </div>
            <div className="col-6">
            </div>
            <div className="col">
              <button id="new-quote" onClick={getRandomQuote} className="btn btn-primary" style={{backgroundColor: color}}>New Quote</button>
            </div>
          </div>
        </div>
        <p style={{color:"white"}}>By Sean Liu</p>
      </div>
    </div>
  );
}

export default App;
