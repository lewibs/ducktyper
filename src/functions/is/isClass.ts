// Import isDuck function from your module
var isDuck = require("./isDuck");

// Define isClass function
export default function isClass(cls) {
  console.warn(cls.name);
  // Check if the name starts with an uppercase letter (assumes class naming convention)
  if (/^[A-Z].*$/.test(cls.name)) {
    return true;
  }

  // If all checks fail, assume it's not a class
  return false;
}
