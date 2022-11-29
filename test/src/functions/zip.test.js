import zip from "../../../src/functions/zip";

test("tests zip", ()=>{
    let z = zip([1,2,3,4,5], [1,2,3,4,5]);
    let a = zip([1,2,3,4,5]);
    let c = zip([1,2,3,4,5], [1,2,3,4,5], [1,2,3,4,5]);

    z.forEach((a, t)=>{
        let i = t + 1;
        expect(a[0] === i && a[1] === i).toBe(true);
    });

    a.forEach((a, t)=>{
        let i = t + 1;
        expect(a[0] === i).toBe(true);
    });

    c.forEach((a, t)=>{
        let i = t + 1;
        expect(a[0] === i && a[1] === i && a[2] === i).toBe(true);
    });
})