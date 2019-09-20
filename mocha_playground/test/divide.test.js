//const divide = require("../index");
const sort = require("../index");
const expect = require("chai").expect;

// describe("Divide function", () => {
//   it("should divide positive integers correctly", () => {
//     //code here
//     const a = 8;
//     const b = 4;
//     const expectedAnswer = 2;

//     const actualAnswer = divide(a, b);

//     expect(actualAnswer).to.equal(expectedAnswer);
//   });
//   it("should thow an error when divide by zero", () => {
//     //code here

//     const a = 8,
//       b = 0;

//     const fn = () => {
//       divide(a, b);
//     };
//     expect(fn).to.throw();
//   });
//   it("should divide by a negative interger correctly", () => {
//     //code here

//     const a = 8;
//     const b = -2;

//     const expectedAnswer = -4;

//     const actualAnswer = divide(a, b);
//     expect(actualAnswer).to.equal(expectedAnswer);
//   });
// });

describe("Divide function", () => {
  it("should assort array in ascending order", () => {
    //code here
    const arr1 = [5, 4, 1];
    const arr2 = [9, 1];

    expect(arr1).to.deep.equal(arr2);
  });
});
