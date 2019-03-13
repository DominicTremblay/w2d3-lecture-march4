const express = require('express');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const methodOverride = require('method-override');

const app = express();
const port = 8080;

// Use static resources such as css from the public folder
app.use(express.static('public'));

// body parser is a middleware for extracting information from froms
app.use(bodyParser.urlencoded({ extended: false }));

// Movie quotes database
const movieQuotesDb = {
  'd9424e04-9df6-4b76-86cc-9069ca8ee4bb': {
    id: 'd9424e04-9df6-4b76-86cc-9069ca8ee4bb',
    quote: 'Why so serious?',
  },
  '27b03e95-27d3-4ad1-9781-f4556c1dee3e': {
    id: '27b03e95-27d3-4ad1-9781-f4556c1dee3e',
    quote: 'YOU SHALL NOT PASS!',
  },
  '5b2cdbcb-7b77-4b23-939f-5096300e1100': {
    id: '5b2cdbcb-7b77-4b23-939f-5096300e1100',
    quote: "It's called a hustle, sweetheart.",
  },
  '917d445c-e8ae-4ed9-8609-4bf305de8ba8': {
    id: '917d445c-e8ae-4ed9-8609-4bf305de8ba8',
    quote: 'The greatest teacher, failure is.',
  },
  '4ad11feb-a76a-42ae-a1c6-8e30dc12c3fe': {
    id: '4ad11feb-a76a-42ae-a1c6-8e30dc12c3fe',
    quote: 'Speak Friend and Enter',
  },
};

// Comments database
const quoteComments = {
  '70fcf8bd-6cb0-42f3-9887-77aa9db4f0ac': {
    id: '70fcf8bd-6cb0-42f3-9887-77aa9db4f0ac',
    comment: 'So awesome comment!',
    quoteId: 'd9424e04-9df6-4b76-86cc-9069ca8ee4bb',
  },
};

const commentsByQuoteId = (quoteId, commentsArr) =>
  commentsArr.filter(commentObj => commentObj.quoteId === quoteId);

const quoteList = () => {
  // creating an array of movie quote objects
  const quotesArr = Object.values(movieQuotesDb);

  // creating an array of comment objects
  const commentsArr = Object.values(quoteComments);

  // Add a comments property to each quoteObj in the array
  // comments property is an array of comment objects obtained
  // by commentsByQuoteId

  const movieQuotesComments = quotesArr.map(quoteObj => {
    movieObj.comments = commentsByQuoteId(quoteId, commentsArr);
    return quoteObj;
  });

  return movieQuotesComments;
};

// Add a new quote to the movieQuoteDb
const addQuote = quote => {
  const id = uuidv4();
  const newQuote = {
    id: id,
    quote: quote,
  };

  movieQuotesDb[id] = newQuote;
};

// LIST OF END POINTS

// use ejs as templating engine
app.set('view engine', 'ejs');

// redirect to /quotes page
app.get('/', (req, res) => {
  res.redirect('/quotes');
});

// Display the list of quotes
app.get('/quotes', (req, res) => {
  const quotes = quoteList();
  res.render('quotes', { quotes });
});

// DISPLAY THE FORM TO CREATE A NEW QUOTE
// quote_new

app.get('/quotes/new', (req, res) => {
  res.render('quote_new');
});

// Create a new quote
app.post('/quotes', (req, res) => {
  const quote = req.body.quote;
  // es6
  // const { quote } = req.body;

  // calling addQuote fct to add quote to db
  addQuote(quote);
  res.redirect('/quotes');
});

// Server is listening for requests on a specified port
app.listen(port, () => console.log(`Express server running on port ${port}`));
