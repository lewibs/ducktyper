import { makeDuck, duckorate, isString, classifyDuck, ISDUCK_OPTIONS, DuckDto, dtoToIsDuck } from "../../../src/index";

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

test("testing decorators isolate", ()=>{
    class Post extends DuckDto {
        @duckorate(makeDuck((val)=>val>0))
        id;
    
        @duckorate(isString)
        content;
    }

    let post = new Post();
    post.content = "adf";

    try {
        classifyDuck(post, {throw:true, message: "custom"});
        expect(false).toBe(true);
    } catch (error) {
        expect(error.message).toBe("custom");
    }
});

test("testing decorators message", ()=>{
    class Post extends DuckDto {
        @duckorate(makeDuck((val)=>val>0))
        id;
    
        @duckorate(isString)
        content;
    }

    let post = new Post();
    post.id = 123;
    post.content = 123;
    try {
        classifyDuck(post, {throw:true});
        expect(false).toBe(true);
    } catch (error) {
        expect(error.message).toBe("Not a string");
    }
});

test("testing forceDuck", ()=>{
    class Boring {
        apple="apple";
    }

    const b = new Boring();
    try {
        expect(classifyDuck(b)).toBe(true);
    } catch(e) {
        expect(false).toBe(true);
    }

    try {
        classifyDuck(b, {forceDuck:true});
    } catch(e) {
        expect(e.message).toBe("Must be an instance of DuckDto to be clasified");
    }
});

test("nested dtos", ()=>{
    class Dto extends DuckDto {
        @duckorate(isString)
        content;
    }

    class Post extends DuckDto {
        @duckorate(makeDuck((val)=>val>0))
        id;
    
        @duckorate(dtoToIsDuck(Dto))
        content;
    }

    const post = new Post();
    post.id = 345678;
    post.content = undefined;

    try {
        classifyDuck(post, {throw:true});
    } catch (e) {
        expect(e.message).toBe("Not a string");
    }

    post.content = {
        content: 123,
    };

    try {
        classifyDuck(post, {throw:true});
    } catch (e) {
        expect(e.message).toBe("Not a string");
    }

    post.content.content = "123456";

    expect(classifyDuck(post, {throw:true})).toBe(true);
});

test("Test classifyDuck undefiend", ()=>{
    class Dto extends DuckDto {
        @duckorate(isString)
        content;
    }

    expect(classifyDuck(undefined, {throw:true})).toBe(true);
    expect(classifyDuck({}, {throw:true})).toBe(true);
})