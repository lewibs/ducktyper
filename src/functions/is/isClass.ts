// Import isDuck function from your module
var isDuck = require("./isDuck");

// Define isClass function
export default function isClass(cls) {
  // Check if cls is a function and has a prototype
  if (typeof cls === 'function' && cls.prototype) {
    // Attempt to detect if it's a class
    try {
      // Check if it has the name "class" in its string representation
      if (/class/.test(cls.toString())) {
        return true;
      }

      // Attempt to instantiate it without 'new', which should throw an error for classes
      try {
        cls();
      } catch(e) {
        if (e instanceof TypeError && e.message.indexOf("class constructors must be invoked with 'new'") !== -1) {
          return true;
        }
      }

      // Check if the name starts with an uppercase letter (assumes class naming convention)
      if (/^[A-Z].*$/.test(cls.name)) {
        return true;
      }
    } catch (e) {
      // If any of the checks throw an error, assume it's not a class
      return false;
    }
  }
  // If all checks fail, assume it's not a class
  return false;
}
