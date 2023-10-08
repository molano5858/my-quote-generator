const quoteContainer = document.getElementById("qoute-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

const loader = document.getElementById("loader");
let apiQuote = [];

// show loader
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loader
function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// random function
function newQuote() {
  showLoadingSpinner();
  // pick a random qoute
  const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
  //check if author is blank and replace it with 'Unknown'
  if (quote.author) {
    quoteAuthor.textContent = quote.author;
  } else {
    quoteAuthor.textContent = "Unknown";
  }
  // check qoute length to change the styling
  if (quote.text.length > 100) {
    console.log(quote.text.length);
    quoteText.classList.add("long-quote");
  } else {
    console.log(quote.text.length);
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
  // when set quote, hide loader
  removeLoadingSpinner();
}

async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  // a little delay to can see the loader
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const response = await fetch(apiUrl);
    apiQuote = await response.json();
    newQuote();
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

// Tweet the Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
}

// function delay

// event listeners
newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

// onLoad
getQuotes();
