const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Get Quote from API
async function getQuote() {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // if author is blank, replace with unknown
    if (data.quoteAuthor === "") {
      authorText.innerHTML = "Unknown";
    } else {
      authorText.innerHTML = data.quoteAuthor;
    }
    // add long-quote css if quote length is > 50
    if (data.quoteText.length > 50) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerHTML = data.quoteText;
  } catch (error) {
    getQuote();
  }
}

function tweetQuote() {
  const quote = quoteText.innerHTML;
  const author = authorText.innerHTML;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(twitterUrl, "_blank");
}

// add event listener
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", getQuote);

// On load
getQuote();
