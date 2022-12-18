import { makeDuck, duckorate, isString, classifyDuck, ISDUCK_OPTIONS } from "../../../src/index";

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

    expect(classifyDuck(post)).toBe(false);

    try {
        classifyDuck(post, {
            throw:true
        });
        expect(false).toBe(true);
    } catch(error) {
        expect(error.message).toBe(ISDUCK_OPTIONS.message);
    }

    post.id = 1;
    expect(classifyDuck(post)).toBe(true);

    try {
        classifyDuck(post, {throw:true, message: "custom"});
        expect(false).toBe(true);
    } catch (error) {
        expect(error.message).toBe("custom");
    }


    post.id = 123;
    post.content = 123;
    try {
        classifyDuck(post, {throw:true});
        expect(false).toBe(true);
    } catch (error) {
        expect(error.message).toBe("Not a string");
    }
});