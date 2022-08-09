import filterReducer from "../../functions/filterReducer";

test("merge multiple filters together", ()=>{
    function a(bool) {
        return bool;
    }

    function b(bool) {
        return bool;
    }

    function c(bool) {
        return bool;
    }

    function d(bool) {
        return bool;
    }

    function inverse(bool) {
        return !bool;
    }

    expect([a,b,c,d,inverse].reduce(filterReducer)(true)).toBe(false);
    expect([a,b,c,d].reduce(filterReducer)(true)).toBe(true);
    expect([a,b,c,d].reduce(filterReducer)(false)).toBe(false);
})