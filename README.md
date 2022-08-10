# DuckTyper
A tool for validating input based on the fundimental js idea of duck typing. The concept of this is to allow the fluidness of a dynamically typed language with the clarity of a static one. It takes advantage of a typing that is commonly known in js as duck typing. Meaning, If it walks and talks like a duck it's a duck.
<br/>

While duck typing exists in typscript (and many new languages), in my opinion, it could be done better. DuckTyper has the single goal of having simple and clear syntax. It follows similar design patterns of styled-components, which are easy, quick, and clear to make.
<br/>

## Usage
It was designed functionally, and as a result opperates best when used as such. However, a clasical version is included and is discribed more in depth below.
<br/>

| Accepted Types | Description |
| -------------- | ----------- |
| initialized primatives ("string", 1234, ...etc) | Will accept any value that is equal to the primative passed in |
| Primatives (String, Number, ...etc) | Will accept any primative value https://developer.mozilla.org/en-US/docs/Glossary/Primitive |
| Array | Has two types of arrays: single type arrays and structured arrays |
| Object | An object with fields any of the accepted types |
| isDuck | the type returned when a type is created |

| Options | Description |
| ------- | ----------- |
| throw: Boolean | Value indicating if a boolian for success will be returned or if it will throw a message on error |
| allowUndefiend: Boolean | Value indicating if an undefined input will be accepted |
| error: String | The message that is thrown when input fails to pass tests |

### functional usage
```javascript
import {makeDuck, updateDefaults, Any} from "ducktyper";

//here we create a type that checks if an object has a name. We then attach some options to the duck typer...
const isNamed = updateDefaults(
    makeDuck({
        name: String,
    }),
    {
        message: "value failed to provide name field as a string",
    })
```

### clasical usage