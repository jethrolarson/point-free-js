/** Crazy Functional JavaScript
 *  @author Jethro Larson <mailto:jethrol@amazon.com>
 *  @summary In this talk we'll create our own functional library from scratch, drop
 *  arguments from procedural JS, and uncover a style of programming you may not
 *  have tried before. If you've never used function composition or currying in JS
 *  then you're in for a treat.
 */


var hi = function(str) {
  return "Hi " + str;
};

var greet = function(name) {
  return hi(name);
};





//--- multiple arguments
var hiFormal = function(firstName, lastName) {
  return "Greetings, " + firstName + ' ' + lastName;
};

// =>
// ;;













//------- Mappin' --------

//Supose we have an array of people objects:
var people = require('./people') //Show this ->

// Get array of people's last names

//Typical approach
var getLastNames = function(people){
  var lastNames = []
  for(var i = 0, len = people.length; i < len; i++){
    lastNames.push(people[i].last)
  }
  return lastNames
}


//naive




// (.)




// a new map


// Hindley-Milner

//----------Composin'---------

// Get a list of our peoples' ages

//Typical solution (was actually a copy/modify)
function getAges(ar){
  var out = [];
  var nowMS = new Date().getTime();
  var ageMS = 0;
  var birthdayMS = 0;
  for(var i = 0, len = ar.length; i < len; i++){
    birthdayMS = new Date(ar[i].dob).getTime();
    ageMS = nowMS - birthdayMS;
    out.push(Math.abs(new Date(ageMS).getUTCFullYear() - 1970));
  }
  return out;
}





//refactor out the date logic
var calculateAge = (birthday) => {
 var nowMS = Date.now()
 var birthdayMS = new Date(birthday).getTime()
 var ageMS = nowMS - birthdayMS
 return Math.abs(new Date(ageMS).getUTCFullYear() - 1970)
}

// map


// f • g



// Get people ages multiplied by 2

//map

// λ *


// elaborate curry

// double, quad, half

// (•)

// compose map law

// -------- Filterin' ---------

// Get people over 60

// Y

// >

// (•)

// Just give me the first names



// Get ids of doctors


// ==


// ------- Branchin' --------
//Let's get all the first names and uppercase the presidents
var getFirstNamesCapPres = map((it) => {
    if (it.prefix == 'President') {
        return it.first.toUpperCase()
    } else {
        return it.first
    }
})

// ?:



// .=

// |

