# DuckTyper
A tool for validating input based on the fundamental js idea of duck typing. The concept of this is to allow the fluidness of a dynamically typed language with the clarity of a static one. It takes advantage of a typing that is commonly known in js as duck typing. Meaning, If it walks and talks like a duck it's a duck.
<br/>

<p align="center">
  <img src="https://github.com/lewibs/ducktyper/blob/main/images/duckornot.jpg?raw=true" alt="duck image"/>
</p>

 
While duck typing exists in typescript (and many new languages), in my opinion, it could be done better. DuckTyper has the single goal of having simple and clear syntax. It follows similar design patterns of styled-components, which are easy, quick, and clear to make.
<br/>
 
## Usage
It was designed functionally, and as a result operates best when used as such. However, a classical version is included and is described more in depth below.
<br/>
 
| Basic Types | Description |
| -------------- | ----------- |
| initialized primitives ("string", 1234, ...etc) | Will accept any value that is equal to the primitive passed in |
| Primitives (String, Number, ...etc) | Will accept any primative value https://developer.mozilla.org/en-US/docs/Glossary/Primitive |
| Array | Has two types of arrays: single type arrays and structured arrays |
| Object | An object with fields any of the accepted types |
| isDuck | the type returned when a type is created |
| Any: "any" | Indicates that anything is accepted |
 
| Options | Description |
| ------- | ----------- |
| throw: Boolean | Value indicating if a boolean for success will be returned or if it will throw a message on error |
| allowUndefiend: Boolean | Value indicating if an undefined input will be accepted |
| error: String | The message that is thrown when input fails to pass tests |
 
### functional usage
 
| Functions | Description |
| --------- | ----------- |
| makeDuck(...types): isDuck | Used to create a type. Any of the basic types can be used within it along with isDuck types |
| updateDefaults(isDuck, options): isDuck | This is used to chain options into isDuck. Returns an isDuck that will be called with the provided options as its new defaults |
| isDuck(val, options): Bool/Error | This is the type that is used to check a value. |
 
```javascript
import {makeDuck, updateDefaults, Any} from "ducktyper";
 
//here we create an object that could be passed into any of these types
let person = {
   name: "Benjamin",
   age: 25,
   address: ["city", "state", 1234, "road"]
   children: [{name:"goliath"}, {name:"fin"}],
   employed: false,
   single: true,
}
 
 
const isNamed = makeDuck({
   name: String,
})
 
//we can attach default options
const isAged = updateDefaults(makeDuck({
   age: Number,
}),
{
   error: "failed to provide age field"
});
 
//we can do a structured array
const isAddress = makeDuck([String, String, Number, String]);
 
const hasAddress = makeDuck({
   address: isAddress,
})
 
const hasChildren = makeDuck({
   children: [isNamed],
})
 
//can combine ducks into one big duck
const isPerson = makeDuck(isNamed, isAged, hasAddress, hasChildren);
 
//usage
isPerson(person)
```
 
### classical usage
This is available... However, I recommend using the functional method as it is better tested and how the code was designed.
 
| Methods | Description |
| ------- | ----------- |
| constructor | works the same way as makeDuck above |
| test | works the same way as isDuck above |
| defaults | setter for adding default parameters to the test call |
| add | Works like the constructor. Updates the current object |
 
```javascript
//to create a type for the oop pattern we need to call new.
const hasFeet = new Duck({
   leftFoot: Boolean,
   rightFoot: Boolean,
});
 
const hasName = new Duck({
   name: String,
})
 
const hasAge = new Duck({
   age: Number,
})
 
const isPerson = new Duck(
   hasName,
   hasAge
)
 
//if we want to add more types to this object we can by calling add
isPerson.add(hasFeet);
 
//we can set the default options
isPerson.defaults = {throw:false}
 
//call the test method to check a value
isPerson.test(person)
```