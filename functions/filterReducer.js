export default function filterReducer(a,b) {
    return function chainedFilter(...args) {
        return a(...args) && b(...args);
    }
}