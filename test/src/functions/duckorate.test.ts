import { makeDuck, duckorate, isString, classifyDuck, ISDUCK_OPTIONS, DuckDto } from "../../../src/index";

test("testing decorators", ()=>{
    class Post extends DuckDto {
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

    const hasPost = makeDuck({
        post: Post,
    })

    expect(hasPost({
        post: post,
    })).toBe(false);

    post.content = "asdfasdf";
    expect(hasPost({
        post: post,
    })).toBe(true);

    try {
        post.content = 123;
        hasPost({
            post: post,
        }, {
            throw: true,
        })
        expect(false).toBe(true);
    } catch (error) {
        expect(error.message).toBe("Not a string");
    }

    expect(hasPost({
        post: {
            id: 123,
            content:"asdf"
        },
    })).toBe(true);

    expect(hasPost({
        post: {
            id: 123,
            content:123
        },
    })).toBe(false);
});