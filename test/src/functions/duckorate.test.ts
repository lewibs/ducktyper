import { makeDuck, duckorate, isString, clasifyDuck, ISDUCK_OPTIONS } from "../../../src/index";

test("testing decorators", ()=>{
    const isPost = makeDuck({
        id: Number,
        content: String,
    })
    
    class Post {
        @duckorate(makeDuck((val)=>val>0))
        id;
    
        @duckorate(isString)
        content;
    }  

    let post = new Post();
    post.id = 0;
    post.content = "adf";

    expect(clasifyDuck(post)).toBe(false);

    try {
        clasifyDuck(post, {
            throw:true
        });
        expect(false).toBe(true);
    } catch(error) {
        expect(error.message).toBe(ISDUCK_OPTIONS.message);
    }

    post.id = 1;
    expect(clasifyDuck(post)).toBe(true);
});