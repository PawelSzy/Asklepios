







describe("test", function() {
  it("test Jasmine", function() {
    expect("1234").toEqual("1234");
  });
});  

describe("Kalendarz", function() {
  it("Sprawdza dzialanie kalendarza", function() {
    expect(ostatniPoniedzialek("2016-03-08")).toEqual("Mon Mar 07 2016 01:00:00 GMT+0100 (Środkowoeuropejski czas stand.);
  });


  
});    