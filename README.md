# DuckTyper
A tool for validating input based on the fundamental js idea of duck typing. The concept of this is to allow the fluidness of a dynamically typed language with the clarity of a static one. It takes advantage of a typing that is commonly known in js as duck typing. Meaning, If it walks and talks like a duck it's a duck.
<br/>

<p align="center">
  <img src="https://github.com/lewibs/ducktyper/blob/main/images/duckornot.jpg?raw=true" alt="duck image"/>
</p>

 Ducktyper has the single goal of having simple and clear syntax. It follows similar design patterns of styled-components and class-validator. With ducktyper, validators are easy, quick, and clear to make. By allowing complex validaton that stricter validation libraries don't provide, ducktyper puts validation in the hands of the developer as though it was a typing system.

<br/>
 
## Usage
It was designed functionally, and as a result operates best when used as such. However, a classical version is included and is described more in depth below.
<br/>

This is a list of the main functions that ducktyper provides. The main two are makeDuck and duckfaults which allow you do make any validation you could hope for.

| Functions | Description |
| --------- | ----------- |
| makeDuck(...types): isDuck | Used to create a type. Any of the basic types can be used within it along with isDuck types |
| duckorate(isDuck, options): duckorator(val) | this is used to make a new decorator to place on a class. |
| duckfaults(isDuck, options): isDuck | This is used to chain options into isDuck. Returns an isDuck that will be called with the provided options as its new defaults |
| isDuck(val, options): Bool/Error | This is the type that is used to check a value. This is generated by makeduck |
| classifyDuck(dto, options): Bool/Error | This is used in the same way that an isDuck is used. However it takes in a dto with duckorators as input. |
| initClassifyDuckOptions(obj) | this is used to update the default options that are used when classifyDuck is called on a dto |
| initIsDuckOptions(obj) | this is used to update the default options when makeDuck is called to initalize a isDuck |
<br/>

These are frequently used types that will allow you to save overhead time rather then having to make a new validator every time you need a basic type. If there are any common types you would like added raise an issue in the github.

| Common | Description |
| --------- | ----------- |
| isString | checks if input is a string |
| isNumber | checks if an input is a number | 
| isObject | checks if an input is an object |
| isBoolean | checks if an input is a bool |
| isArray | checks if input is an array |
<br/>

These are a list of accepted types which you can put into makeDuck. Most of which are generic types that most languages have. They can be inserted by themselves, or they can be placed in an array or object.

| Basic Types | Description |
| -------------- | ----------- |
| initialized primitives ("string", 1234, ...etc) | Will accept any value that is equal to the primitive passed in |
| Primitives (String, Number, ...etc) | Will accept any primative value https://developer.mozilla.org/en-US/docs/Glossary/Primitive |
| Array | Has two types of arrays: single type arrays and structured arrays |
| Object | An object with fields any of the accepted types |
| isDuck | the type returned when a type is created |
| Any: function | Indicates that anything is accepted |
| Class: object | You can use any type of class that you would like. This includes custom and defaut js classes |
| function(val):boolean | This is used when a value has specifics that it must follow other then generic types | 
<br/>

These are a list of option that you can attach to a isDuck or call at runtime.

| Options | Description |
| ------- | ----------- |
| throw: Boolean | Value indicating if a boolean for success will be returned or if it will throw a message on error |
| allowUndefiend: Boolean | Value indicating if an undefined input will be accepted |
| message: String | The message that is thrown when input fails to pass tests |
| allowEmpty: Boolean | By default this is true. However when you want to make sure an array or string is not empty set this to false |
| allowEmptyString: Boolean | By default this is not included. However when you want to make sure a string is not empty set this to false if it is okay set it to true. This takes precidence over allowEmpty |
| allowEmptyArray: Boolean | By default this is not included. However when you want to make sure an array is not empty set this to false if it is okay set it to true. This takes precidence over allowEmpty |
| childMessage: Boolean | By default this is set as true. What this does is signify that we want the message given by the child if any are given. If it is set to false it will return the parent message every time |
<br/>


### functional usage
 
```javascript
import {makeDuck, duckfaults, Any} from "ducktyper";
 
//here we create an object that could be passed into any of these types
let person = {
   name: "Benjamin",
   age: 22,
   address: ["city", "state", 1234, "road"]
   children: [{name:"goliath"}, {name:"fin"}],
   employed: true,
   single: true,
}
 
 
const isNamed = makeDuck({
   name: String,
})
 
//we can attach default options
//and we can use custom validation functions
const isAged = duckfaults(makeDuck({
   age: v=>v>=0,
}),
{
   throw: true,
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

### dto usage
Ducktyper can now be used to decorate classes with the use of dtos in mind. That being said, the validator will apply itself to the part of the class that should be validated with that ducktype. If it is added to a class the constructor is checked, if it is added to a field then the field is checked on updated. If it is added to a parameter, then the parameter is checked when the function or method is used.

```javascript
import {makeDuck, duckorate} from "ducktyper";

const isQuack = makeDuck((val)=>"quack"===val);
const isEats = makeDuck((val)=>val==="bread" || val==="seeds");

class DuckDto() {
   @duckorate(isQuack)
   sound;

   @duckorate(isEats)
   eats;   
}
```
