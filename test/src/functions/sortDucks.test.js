import {makeDuck as ducker} from "../../../src/functions/ducker";
import isDuck from "../../../src/functions/is/isDuck";
import sortDucks from "../../../src/functions/sortDucks";

function notDuck(){}

const ducks = [ducker(String),ducker("force"),ducker(Boolean),ducker(true)];
const notDucks = [notDuck,notDuck,notDuck,notDuck];

test("makes sure the ducks get split from the non ducks", ()=>{
    let [is, isnt] = sortDucks(ducks.concat(notDucks));
    
    is.forEach((a)=>{
        expect(isDuck(a)).toBe(true);
    })

    isnt.forEach((a)=>{
        expect(isDuck(a)).toBe(false);
    })
})