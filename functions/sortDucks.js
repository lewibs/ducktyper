import {DUCK} from './ducker';

export default function sortDucks(arr) {
    //[duckValidators, other]
    const sorted = [[], []];

    arr.forEach((val)=>{
        if (val.name === DUCK) {
            sorted[0].push(val);
        } else {
            sorted[1].push(val);
        }
    });

    return sorted;
}