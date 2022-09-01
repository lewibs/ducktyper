//checking if the function prototype has property other than constructor and checking
//if the function prototype is Function.prototype.
//This solution can also work even after transpiled with babel, or the script is
//running with "use strict". But this solution will only work if the class have at least
//one public function, or have extend other class.

export default function isClass(func){
    // Class constructor is also a function
    if(!(func && func.constructor === Function) || func.prototype === undefined)
      return false;
    
    // This is a class that extends other class
    if(Function.prototype !== Object.getPrototypeOf(func))
      return true;
    
    // Usually a function will only have 'constructor' in the prototype
    return Object.getOwnPropertyNames(func.prototype).length > 1;
  }