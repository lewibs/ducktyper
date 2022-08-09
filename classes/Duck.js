import { makeDuck, updateDefaults } from "../functions/ducker";
import isDuck from "../functions/is/isDuck";

export default class Duck {
    test;

    constructor(...ducks) {
        ducks = ducks.map((duck)=>{
            if (duck instanceof Duck) {
                return duck.test;
            } else {
                return duck
            }
        });
        this.test = makeDuck(...ducks);
    }

    set defaults(options) {
        if (options === undefined) {
            return;
        }

        this.test = updateDefaults(this.test, options);
    }

    add(...ducks) {
        ducks.forEach((duck)=>{
            if (!isDuck(duck)) {
                throw new Error("unable to add to call chain");
            }

            if (duck instanceof Duck) {
                duck = duck.test;
            }

            let test = this.test
            this.test = makeDuck(test, duck);
        });
    }
}