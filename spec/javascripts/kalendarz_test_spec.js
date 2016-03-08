

describe("test", function() {
  it("test Jasmine", function() {
    expect("1234").toEqual("1234");
  });
});  

describe("Ostatni Poniedzialek", function() {
  it("Sprawdza funckji podajac poprzedni poniedzialek od wybranej daty", function() {
    expect( ostatniPoniedzialek("2016-03-08") ).toEqual( new Date("Mon Mar 07 2016 01:00:00 GMT+0100 (Środkowoeuropejski czas stand.") );
  });
});  

describe("ileDniOdPoniedzialku Poniedzialek", function() {
  it("Ile dni od poniedzialki - powinno być jeden dzien", function() {
  	data = new Date("2016-03-08");
    expect(ileDniOdPoniedzialku(data)).toEqual(1);
  });
});  



describe("Kalendarz", function() {
  var kal = new  kalendarz;  
  it("test tworzenie Kalendarza", function() {
    expect(kal).toBeDefined();
  });

  it("test kalendarz miesiace", function() {
    expect(kal.miesiaceOdmiana).toMatch('[ "stycznia", "lutego", "marca","kwietnia", "maja", "czerwca", "lipca", "sierpnia", "wrzesnia", "października", "listopada", "grudnia" ]');
  });

  it("test kalendarz miesiace", function() {
    expect(kal.miesiaceOdmiana).toMatch('[ "stycznia", "lutego", "marca","kwietnia", "maja", "czerwca", "lipca", "sierpnia", "wrzesnia", "października", "listopada", "grudnia" ]');
  });

  it("test kalendarz godziny ", function() {
    expect(kal.godziny).toEqual([7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
  });


  it("test kalendarz dzisiejsza data ", function() {
    expect(kal.dzisiajData.getDay()).toEqual(new Date().getDay());
    expect(kal.dzisiajData.getDate()).toEqual(new Date().getDate());
    expect(kal.dzisiajData.getFullYear()).toEqual(new Date().getFullYear());    
  });

  it("test naglowek kalendarza ", function() {
  	loadFixtures("kalendarz.html.erb");
  	naglowek = "test naglowek";
  	kal.ustawNaglowekDaty( naglowek );
	expect( $('#naglowek_kal_daty').text() ).toMatch( naglowek );  
  });
  
});  
   