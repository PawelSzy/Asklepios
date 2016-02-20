//Obsluga kalendarza
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//funkcja odpowiada za pobranie danych ktore ustawiaja pierwszy dzien kalendarza
//@start do funkcji przekazujemy zmienna typKalendarza o typie albo "lekarz" albo "pacjent"
function kalendarz() {
  this.miesiaceOdmiana = [ "stycznia", "lutego", "marca","kwietnia", "maja", "czerwica", "lipca", "sierpnia", "wrzesnia", "października", "listopada", "grudnia" ];
  this.godziny =(function(a,b){while(a--)b[a]=a+7;return b})(11,[]);
  this.iloscDniTygodnia = 7;
  this.lekarz_id = null;

  this.dzisiajData = new Date();
  this.pierwszyDzienTygodnia = ostatniPoniedzialek(this.dzisiajData);
  


  dataNiedzie = new Date(this.pierwszyDzienTygodnia.valueOf() );
  dataNiedzie.setDate(this.pierwszyDzienTygodnia.getDate() + 6);  
  this.niedzielaTygodnia = dataNiedzie ;

  //uruchom funkcje odpowiadajece za obsluge kalendarza
  this.wypelnijKalendarz();
  this.ustawNaglowekDaty();
  this.ustawPrzyciskiNastepnyPoprzedniTydz();


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

//wypelnia komorke danym znakiem
//@start do funkcji przekazujemy funkcje ktora po wywolaniu dokona zmiany na odpowiedni typ znaku
kalendarz.prototype.wypelnijKalendarzZnakiem = function(funcjaZmienZnak) {
  for (index = this.iloscDniTygodnia; index > 0; --index) {
    this.godziny.forEach(function(godzina) {
        id_dnia = "godz" + godzina + "dzien"+index;
        funcjaZmienZnak(id_dnia);
    });
  } 
}


//wunkcja wypelnia caly kalendarz znakiem oznaczajacym brak wizyty
// -- ze w tym momencie nie ma rejestracji
kalendarz.prototype.wypelnijKalendarzPustymi = function() {
  //wypelnia komore znamiem -- nie ma rejestracji
  this.wypelnijKalendarzZnakiem(komorkaZnakBrakWyboru);
}

kalendarz.prototype.wypelnijKalendarzZnakiemDostepnosci = function() {
   this.wypelnijKalendarzZnakiem(komorkaZnakDostepnosci);
}

//wypelnia wszystkie miejsca zajetym znakiem --
kalendarz.prototype.wypelnijMinionyTydzien = function() {
  console.log("Miniony tydzien");
  this.wypelnijKalendarzPustymi();

}

kalendarz.prototype.wypelnijNastepnyTydzien = function() {
  console.log("Nastepny tydzien");
  this.wypelnijKalendarzPustymi();    
}

kalendarz.prototype.wypelnijAktualnyTydzien = function() {
  console.log("Aktualny tydzien");
  this.wypelnijKalendarzPustymi();
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


/////////////////////////////////////////////////////////////////////////////////////////
//
//
// Funkcje odpowiedzialne za sprawdzanie i zmiene symboli zajetosci komorek kalendarza //
//
//
/////////////////////////////////////////////////////////////////////////////////////////

//wyswietle znak wizyty - mozna wybrac tą komorke
//@start - id danej komorki
function komorkaZnakDostepnosci(idKomorki) {
   $( "#"+idKomorki ).html("<span  class='custom-checkbox'></span>");  
}

//wyswietle znak wizyty - komorka juz zostala wybrana
//@start - id danej komorki
function komorkaZnakWybrano(idKomorki) {
    $( "#"+idKomorki ).html("<span  class='custom-checkbox'></span>");
    // komorkaZmienZaznaczOdznacz(idKomorki);  
    $("#"+idKomorki).addClass('pjTsWeeklyIconSelected pjTsSelectorRemoveFromCart tsSelectorRemoveTimeslot');  
    console.log("komorkaZnakWybrano");
    $("#"+idKomorki).attr('data-zaznaczona', true);   
}

//Zmienia znak wizyty - jesli komorka zaznaczona to odznacz, jesli nie zaznaczona to odznacz
//@start - id danej komorki
function komorkaZmienZaznaczOdznacz(idKomorki) {
  $("#"+idKomorki).toggleClass('pjTsWeeklyIconSelected pjTsSelectorRemoveFromCart tsSelectorRemoveTimeslot');
  console.log("komorkaZmienZaznaczOdznacz"); 
  if ( $("#"+idKomorki).attr('data-zaznaczona') !== "true") {
    $("#"+idKomorki).attr('data-zaznaczona', "true");
  }  else if ( $("#"+idKomorki).attr('data-zaznaczona') === "true") {
    $("#"+idKomorki).attr('data-zaznaczona', "false");
  }
  
}

//wyswietle znak wizyty - komorka jest niedostepna nie mozna jej wybrac 
//@start - id danej komorki
function komorkaZnakNiedostepna(idKomorki) {
  $( "#"+idKomorki ).html('<div class="booked-btn"></div>');
}


//wunkcja wypelnia komorke znakiem oznaczajacym brak wizyty
// -- ze w tym momencie nie ma rejestracji
function komorkaZnakBrakWyboru(idKomorki) {
  $ ( "#"+idKomorki ).html( "<small>-- </small>" );  
  $ ( "#"+idKomorki ).removeClass("custom-checkbox pjTsWeeklyIconAvailable pjTsSelectorAddToCart pjTsWeeklyIconSelected pjTsSelectorRemoveFromCart tsSelectorRemoveTimeslot");
  $("#"+idKomorki).off("click");
}


//Sprawdz czy komorka jest odznaczona 
//@start - id danej komorki
//@return bolleand - jessli komorka jest odznaczona zwroc true, jesli nie zwroc false
function czyKomorkaOdznaczona(idKomorki) {
  console.log("czyKomorkaOdznaczona");
   if ( $("#"+idKomorki).attr('data-zaznaczona') !== "true" ){
    console.log("komorka jest odznaczona");
    return true;
   } else {
    return false;
   }
}

//Sprawdz czy komorka jest odznaczona 
//@start - id danej komorki
//@return bolleand - jessli komorka jest zaznaczona zwroc true, jesli nie jest zaznaczona zwroc false
function czyKomorkaZaznaczona(idKomorki) {
  console.log("czyKomorkaZaznaczona");
   if ( $("#"+idKomorki).attr('data-zaznaczona') === "true") {
    console.log("komorka jest zaznaczona");    
    return true;
   } else {
    return false;
   }
}

