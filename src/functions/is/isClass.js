import isDuck from "./isDuck";

//taken from https://github.com/nof1000/isclass/blob/master/index.js
//this is likely to not work in anything other then an ES6 environment might need to redo this
export default function isClass(cls) {
  //saves time. no point in checking if it fails basics
  if (typeof cls === 'function' && cls.prototype) {
    //really odd edgecase that can be found in "test any"
    // if (isDuck(cls)) {
    //   return false;
    // }

    try {
      //if it has the name class requires ES6
      if (cls.toString().includes("class")) {
        return true;
      }

      //this should throw if its a class requires ES6
      try {
        cls();
      } catch(e) {
        if (e.message === "Uncaught TypeError: class constructors must be invoked with 'new'") {
          return true;
        }
      }

      //last ditch attempt at hoping the user follows best practice is using older then ES6
      if (cls.name.charAt(0) === cls.name.charAt(0).toUpperCase()) {
        return true;
      }
    } catch (e) {
      //if any of these throw its safe to assume its not a class
      return false;
    }
  }
  //if all checks fail assume false
  return false;
}
