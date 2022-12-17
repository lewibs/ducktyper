import { makeDuck, duckorate, isString, DuckTypes } from "../../../src/index";
import { validateOrReject } from "class-validator";
import "reflect-metadata";

import {
    validate,
} from 'class-validator';
  
  class Post {
    @duckorate(isString)
    field;
  }  

test("testing decorators", ()=>{
    let post = new Post();
    post.field = 123;

    try {
        validateOrReject(post);
    } catch (error) {
        console.log(error.message);
    } 
});