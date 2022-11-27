import isDuck from "./isDuck";

//taken from https://github.com/nof1000/isclass/blob/master/index.js
//this is likely to not work in anything other then an ES6 environment might need to redo some work
export default function isClass(cls) {
    try {
        // class is a function
        if (typeof(cls) !== 'function') {
          return false;
        }

        //class has protos
        if (!cls.prototype) { 
          return false;
        }

        //check if its an isDuck
        if (isDuck(cls)) {
          return false;
        }

        //these are not accessable in strict mode for a class
        cls.arguments && cls.caller;

        //this should throw if its a class
        cls();

        //if its a function whcih throws with no input rip my guy. idk
        return false;
    } catch(e) {
        return true;
    }
}