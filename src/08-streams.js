//TODO cut this
// By the way, you can use everything you just learned on streams.
// Actually, you can use what we've already *created* with streams
// because our functions have been written in a reusable fashion.

// We'll use flyd as the stream lib since it's very friendly to ramda.

// So lets say that we want to process votes coming into an election on the fly.

// We'll still use our person objects but they'll have a new property
// votesFor: last_name

var R = require('ramda');
var flyd = require('flyd');
flyd.filter = R.curry(require('flyd-filter'));
var log = console.log.bind(console);

var votes = require('./people.js');

//  new Stream[Person]
var vote$ = flyd.stream();
//
// [some ajax websocket thing that calls votes(x) whenever a vote happens]
//

// How many people have voted for Obama?

// If people were still just an array you might write it like this
// [Person] -> Number
var countObama = R.compose(
    R.sum, // i.e. R.reduce(R.add, 0)
    R.filter(R.equals('Obama')),
    R.map(R.prop('votesFor'))
);
log(countObama(votes));

// That gives you the count now, but what if you want to capture the change
// in votes over time?

// You can create a stream from another stream with scan. It works just like
// reduce but rather than a single value it yields a value on a new stream
// for each step on the input stream.

R.scan(R.add, 0, [1, 2, 3]);
//=> [1, 3, 6];

// Stream[Person] -> Stream[Number]
var countObama$ = R.compose(
    flyd.scan(R.add, 0),
    flyd.filter(R.equals('Obama')),
    R.map(R.prop('votesFor'))
);

// So wait, now we have flyd.filter and flyd.scan mixed in with ramda stuff.
// Is that really necessary?

// Actually no!
// We can use a new feature of Ramda's list functions to use them more generically

// Ramda's list functions implement the transducer specification and can be
// applied to any data that also conforms to it. Flyd does!

// So lets rewrite the above with Ramda's functions:
countObama =  R.compose(
    R.scan(R.add, 0),
    R.filter(R.equals('Obama')),
    R.map(R.prop('votesFor'))
);
//So now countObama can run on any data structure that implements transducers

// The composition of transducers is just another transducer so we can just run
// this on our stream:

countObama$ = flyd.transduce(countObama, vote$);

// log count whenever it changes
var logObamaVotes = R.compose(
    R.map(log),
    countObama$
);

logObamaVotes(vote$);
