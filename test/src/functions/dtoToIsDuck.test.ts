import { makeDuck, duckorate, isString, dtoToIsDuck, DuckDto, ISDUCK_OPTIONS } from "../../../src/index";

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