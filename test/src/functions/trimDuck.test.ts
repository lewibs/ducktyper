import { DuckDto, classifyDuck, duckorate, isNumber, isString, trimDuck } from "../../../src";
import {makeDuck as ducker, makeDuck} from "../../../src/functions/ducker";


test("trimDuck", ()=>{
    class Post extends DuckDto {
        @duckorate(makeDuck((val)=>val>0 && isNumber(val)))
        id;
    
        @duckorate(isString)
        content;
    }  

    const original = {id:2123465, content:"sdfjkljklsdfjklsdfjkl", extra:"string"};
    const trimed:Post = trimDuck(original, Post);

    expect(trimed.id).toBe(original.id);
    expect(trimed.content).toBe(original.content);
    expect(trimed["extra"]).toBe(undefined);

    expect(classifyDuck(trimed)).toBe(true);
    trimed.id = "string";
    expect(classifyDuck(trimed)).toBe(false);
})