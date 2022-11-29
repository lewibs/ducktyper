import isDuck from './is/isDuck';

export default function sortDucks(arr) {
    //[duckValidators, other]
    const sorted = [[], []];

    arr.forEach((val)=>{
        if (isDuck(val)) {
            sorted[0].push(val);
        } else {
            sorted[1].push(val);
        }
    });

    return sorted;
}