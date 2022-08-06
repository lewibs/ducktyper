export default function makeDuckValidator(obj) {

    return function duckFilter(obj) {
        console.log("duck");
        return true;
    }
}