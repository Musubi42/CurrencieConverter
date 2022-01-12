const lib = require("../convertCurrencie");

// Convert Euro to Franc and vice verse
describe("Testing conversion fonction", () => {
  it("Test if 6.55 Francs is exactly equal to 1 Euro", () => {
    const result = lib.FrancToEuro(6.55);

    // This test below is too general to be realy efficient
    expect(result).toEqual(1);
  });

  it("Test if 1 Euro is exactly equal 6.55 Francs", () => {
    const result = lib.EuroToFranc(1);

    //
    expect(result).toEqual(6.55);
  });
});
