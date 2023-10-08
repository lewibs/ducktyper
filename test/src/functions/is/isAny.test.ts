import { Any } from "../../../../src";
import {isAny} from "../../../../src/functions/is/isAny";

test("isAny", ()=>{
    expect(isAny(()=>"asdf")).toBe(false);
    expect(isAny("asdf")).toBe(false);
    expect(isAny(123)).toBe(false);
    expect(isAny([])).toBe(false);
    expect(isAny(Any)).toBe(true);
})