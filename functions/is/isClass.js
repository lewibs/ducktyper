//taken from https://github.com/nof1000/isclass/blob/master/index.js
export default function isClass(cls) {
  if (typeof(cls) === 'function' && cls.prototype) {
    try {
        cls.arguments && cls.caller;
    } catch(e) {
        return true;
    }
  }
  return false;
}