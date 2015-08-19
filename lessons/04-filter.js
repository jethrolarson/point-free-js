var {log, flip, prop, map, compose} = require('../src/index')
var {getAge, getAges} =  require('./03-compose')
var people = require('./people')

// Get people over 60
//--------------------

//We need to take an array and return a smaller array so lets create a helper to encapsulate that.
//:: (a -> Boolean) -> [a] -> [a]
var filter = (pred) => (list) => list.filter(pred)

var getPeopleOver60 = filter((person)=>
  getAge(person) > 60
)

//:: a -> b -> Boolean
var isGreaterThan = a => b => b > a

var getPeopleOver60 = filter((person)=>
  isGreaterThan(60, getAge(person))
)

var getPeopleOver60 = filter((person)=>
  compose(isGreaterThan(60), getAge)(person)
)

//:: [Person] -> [Person]
var getPeopleOver60 = filter(compose(isGreaterThan(60), getAge))

//can't see everyone in the terminal so just give me the first names
log(map(prop('first'))(getPeopleOver60(people)))

//Make it reusable and remove some parens
var getFirstNamesOver60 = compose(
  map(prop('first')),
  getPeopleOver60
)

log(getFirstNamesOver60(people))


// Get ids of doctors
//-------------------

// do filter and map as separate steps
var getIdOfDoctors = (people) => {
  var doctors = filter((it)=> it.prefix === 'Dr.')(people)
  return map(prop('id'))(doctors)
}

//create a function for ===
//:: a -> b -> Boolean
var eq = (a) => (b) => a === b

// use prop and eq
var getIdOfDoctors = (people) => {
  var doctors = filter((it)=> eq('Dr.')(prop('prefix')(it)))(people)
  return map(prop('id'))(doctors)  
}

// use compose and eliminate `it`
var getIdOfDoctors = (people) => {
  var doctors = filter(compose(eq('Dr.'),prop('prefix')))(people)
  return map(prop('id'))(doctors)  
}

// eliminate the doctor varaible and the block
var getIdOfDoctors = (people) =>
  map(prop('id'))(filter(compose(eq('Dr.'),prop('prefix')))(people))


//compose the nesting away
var getIdOfDoctors = (people) => 
  compose(
    map(prop('id')),
    filter(compose(eq('Dr.'), prop('prefix')))
  )(people)

// now the single argument is in final call position so eliminate the function
// body
var getIdOfDoctors = compose(
  map(prop('id')),
  filter(compose(eq('Dr.'), prop('prefix')))
)