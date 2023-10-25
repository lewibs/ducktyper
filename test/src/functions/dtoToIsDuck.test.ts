import { makeDuck, duckorate, isString, dtoToIsDuck, DuckDto, ISDUCK_OPTIONS, classifyDuck } from "../../../src/index";

test("testing decorators", ()=>{
    class Post extends DuckDto {
        @duckorate(makeDuck((val)=>val>0))
        id;
    
        @duckorate(isString)
        content;
    }  

    const isPost = dtoToIsDuck(Post);
    let post = {
        id: 2,
        content: "asdfasdf",
    };
    expect(isPost(post)).toBe(true);
    expect(isPost({})).toBe(false);
    expect(isPost(123456789)).toBe(false);
    expect(isPost("asdfasdf")).toBe(false);

    try {
        isPost({}, {
            throw: true,
        })
        expect(false).toBe(true);
    } catch (e) {
        expect(ISDUCK_OPTIONS.message).toBe(e.message);
    }
});

test("testing dto as undefined", ()=>{
    class Post extends DuckDto {
        @duckorate(makeDuck((val)=>val>0), {message:"bad id"})
        id;
    
        @duckorate(isString)
        content;
    }  

    const isPost = dtoToIsDuck(Post);
    try {
        isPost({id:"adsf", content:"asdf"}, {throw:true})
        expect(true).toBe(false);
    } catch (e) {
        expect(e.message).toBe("bad id");
    }

    try {
        isPost(undefined, {throw:true});
        expect(true).toBe(false);
    } catch (e) {
        expect(e.message).toBe("bad id");
    }
});

test("dtoToIsDuck Array", ()=>{
    class Post extends DuckDto {
        @duckorate(makeDuck((val)=>val>0))
        id;
    
        @duckorate(isString)
        content;
    }

    const isPost = dtoToIsDuck(Post);

    const post = new Post();
    post.id = 1;
    post.content = "test";

    expect(classifyDuck(post)).toBe(true);
    expect(isPost(post)).toBe(true);

    post.id = 0;

    expect(classifyDuck(post)).toBe(false);
    expect(isPost(post)).toBe(false);

    const arePosts = makeDuck([isPost]);
    
    expect(arePosts([post])).toBe(false)

    post.id = 1;

    expect(arePosts([post])).toBe(true)

});