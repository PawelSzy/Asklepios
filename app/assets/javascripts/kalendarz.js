//Obsluga kalendarza
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//funkcja odpowiada za pobranie danych ktore ustawiaja pierwszy dzien kalendarza
//@start do funkcji przekazujemy zmienna typKalendarza o typie albo "lekarz" albo "pacjent"
function kalendarz() {
  this.miesiaceOdmiana = [ "stycznia", "lutego", "marca","kwietnia", "maja", "czerwica", "lipca", "sierpnia", "wrzesnia", "października", "listopada", "grudnia" ];
  this.godziny =(function(a,b){while(a--)b[a]=a+7;return b})(11,[]);
  this.iloscDniTygodnia = 7;
  this.lekarz_id = null;

  dzisiajData = new Date();
  this.pierwszyDzienTygodnia = ostatniPoniedzialek(dzisiajData);
  

  dataNiedzie = new Date(this.pierwszyDzienTygodnia.valueOf() );
  dataNiedzie.setDate(this.pierwszyDzienTygodnia.getDate() + 6);  
  this.niedzielaTygodnia = dataNiedzie ;

  //uruchom funkcje odpowiadajece za obsluge kalendarza
  this.wypelnijKalendarz();
  this.ustawNaglowekDaty();
  this.ustawPrzyciskiNastepnyPoprzedniTydz();
  this.przyciskiLekarza() ;

}


//ustawia duzy napis u gory kalendarza pomiedzy strzalkami przechodzenia na nowy tydzien
//napis informuje o wyswietlanym tygoniu np: 1 maja - 7 maja
kalendarz.prototype.ustawNaglowekDaty = function(text) {
  data1 = this.pierwszyDzienTygodnia.getDate();
  miesiac1 = this.miesiaceOdmiana[ this.pierwszyDzienTygodnia.getMonth() ];
  data2 = this.niedzielaTygodnia.getDate();
  miesiac2 = this.miesiaceOdmiana[ this.niedzielaTygodnia.getMonth() ];

  text = data1 + " " + miesiac1 + " - " + data2 + " " +miesiac2;

  $("#naglowek_kal_daty").text(text);
}


// Funkcja wypełnia kalendarz zaznaczonymi wizytami, wolnymi wizytami, 
// -- oznacza ze to miniony dzien
// X - zajeta godzina wizyty
// kwadrat - wolne miejsce
kalendarz.prototype.wypelnijKalendarz = function() {

  dzisiajData = new Date();

  dataPon = this.pierwszyDzienTygodnia;
  dataNiedzie = this.niedzielaTygodnia;

  if ( dzisiajData > dataNiedzie ) {
    this.wypelnijMinionyTydzien();
  }
  else if (  dzisiajData < dataPon) {
    this.wypelnijNastepnyTydzien();
  }

  else {
  //iteruj po elementach kalendarza ktore maja stare daty
    this.wypelnijAktualnyTydzien();
  }   
}

//wunkcja wypelnia caly kalendarz znakiem oznaczajacym brak wizyty
// -- ze w tym momencie nie ma rejestracji
kalendarz.prototype.wypelnijKalendarzPustymi = function() {
  for (index = this.iloscDniTygodnia; index > 0; --index) {
    this.godziny.forEach(function(godzina) {
        id_dnia = "godz" + godzina + "dzien"+index;
        $( "#"+id_dnia ).html( "<small>-- </small>" );
    });
  } 
}

//wypelnia wszystkie miejsca zajetym znakiem --
kalendarz.prototype.wypelnijMinionyTydzien = function() {
  console.log("Miniony tydzien");
  this.wypelnijKalendarzPustymi();

  
}

kalendarz.prototype.wypelnijNastepnyTydzien = function() {
  console.log("Nastepny tydzien");
  this.wypelnijKalendarzPustymi();  
  lekarz_id = this.lekarz_id;
  lekarz_id = this.lekarz_id
  if (lekarz_id !== null)
  {
    this.wypelnijWizytyLekarza(lekarz_id);
  }         
}

kalendarz.prototype.wypelnijAktualnyTydzien = function() {
  console.log("Aktualny tydzien");
  this.wypelnijKalendarzPustymi();
  lekarz_id = this.lekarz_id
  if (lekarz_id !== null)
  {
    this.wypelnijWizytyLekarza(lekarz_id);
  }
}


//Przesuwa date kalendarza o ustalona liczbe dni
kalendarz.prototype.przesunDate = function(przesunDni) {

  dataPon = this.pierwszyDzienTygodnia;
  dataPon.setDate(dataPon.getDate() + przesunDni);

  dataNiedzie = new Date(this.pierwszyDzienTygodnia.valueOf() );
  dataNiedzie.setDate(this.pierwszyDzienTygodnia.getDate() + 6);  
  this.niedzielaTygodnia = dataNiedzie ;

  //ustaw napisy na gorze kalendarza informujace o dniu tygodnia
  this.ustawNaglowekDaty();
  this.wypelnijKalendarz(); 
}

kalendarz.prototype.nastepnyTydzien = function() {
  this.przesunDate(7);
}


kalendarz.prototype.poprzedniTydzien = function() {
  this.przesunDate(-7);
}

//polacz przyciski nastepny poprzedni tydzien z funkcjami JS zmieniajacymi tydzien
kalendarz.prototype.ustawPrzyciskiNastepnyPoprzedniTydz = function() {
  console.log("ustawPrzyciskiNastepnyPoprzedniTydz");
  tenKalendarz = this;

  //przesun date tydzien do przodu gdy klikam przycisk od id="NastepnyTydzien"
  $("#NastepnyTydzien").click( function(){  
      tenKalendarz.nastepnyTydzien();
  });

  //przesun date tydzien do tylu gdy klikam przycisk od id="PoprzedniTydzien"
  $("#PoprzedniTydzien").click( function(){ 
      tenKalendarz.poprzedniTydzien();
  });

}




