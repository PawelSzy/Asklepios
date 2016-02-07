// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
// = require jquery
// = require jquery_ujs
// = require turbolinks
//= require_tree .


////////////////////////////////
//Oblsuga kalendarza
//////////////////////////////

// console.log("kalendarza");
// var  pierwszyDzienKalendarza = $("#pierwszyDzienKalendarza").text() ;
// console.log(pierwszyDzienKalendarza);

//Konwertuje data z formatu ruby (2016-01-17) na date w formacie JS
function rubyDataIntoJS(data) {
	dataSplit = data.split("-");
	year = dataSplit[0];
	month = dataSplit[1]-1; //odejmij jeden bo js zapisuje miesiac o-11
	day =  dataSplit[2];

	nowaData = new Date(year, month, day);

	return nowaData;
};

rubyDataIntoJS.prototype.splitData = function(data) {
	dataSplit = data.split("-");
	year = dataSplit[0];
	month = dataSplit[1]-1; //odejmij jeden bo js zapisuje miesiac o-11
	day =  dataSplit[2];	

	nowaData = {year: year, month: month, day: day};

	return nowaData;
}


function jsDataIntoRuby(data) {

	day = data.getDate();	//Get the day as a number (1-31)
	month = data.getMonth()+1;	//Get the month (0-11), dodaj 1 aby otrzymac miesiac
	year = data.getFullYear();	//Get the four digit year (yyyy)
	nowaData = year + "-" + month + "-" + day;
	return nowaData;

}

//do funkcji przekazujemy date
//funkcja zwraca ostatni poniedzialek od podanej daty 
function ostatniPoniedzialek(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

//Obsluga kalendarza
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//funkcja odpowiada za pobranie danych ktore ustawiaja pierwszy dzien kalendarza


function kalendarz() {
	this.miesiaceOdmiana = [ "stycznia", "lutego", "marca","kwietnia", "maja", "czerwica", "lipca", "sierpnia", "wrzesnia", "października", "listopada", "grudnia" ];
	this.godziny =(function(a,b){while(a--)b[a]=a+7;return b})(11,[]);
	this.iloscDniTygodnia = 7;

	this.znakZajestaGodzina ="<p>-- </p>" ; 

	dzisiajData = new Date();
	this.pierwszyDzienTygodnia = ostatniPoniedzialek(dzisiajData);
	

	dataNiedzie = new Date(this.pierwszyDzienTygodnia.valueOf() );
	dataNiedzie.setDate(this.pierwszyDzienTygodnia.getDate() + 6);	
	this.niedzielaTygodnia = dataNiedzie ;

	//uruchom funkcje odpowiadajece za obsluge kalendarza
	this.wypelnijKalendarz();
	this.ustawNaglowekDaty();
	this.ustawPrzyciskiNastepnyPoprzedniTydz();
	this.przyciskiLekarza()	;

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

//wypelnia wszystkie miejsca zajetym znakiem --
kalendarz.prototype.wypelnijMinionyTydzien = function() {
	console.log("Miniony tydzien");
	for (index = this.iloscDniTygodnia; index > 0; --index) {
		this.godziny.forEach(function(godzina) {
		    id_dnia = "godz" + godzina + "dzien"+index;
		    $( "#"+id_dnia ).html( "<p>-- </p>" );
		});
	}	
}

kalendarz.prototype.wypelnijNastepnyTydzien = function() {
	console.log("Nastepny tydzien");
}

kalendarz.prototype.wypelnijAktualnyTydzien = function() {
	console.log("Aktualny tydzien");
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


//dodaj obsluge przyciskow Lekarzy - pobierz wizyt danego lekarza
kalendarz.prototype.przyciskiLekarza = function() {
	tenKalendarz = this;
	$(".przycisk_lekarza").click(function(event) {

		  /* stop form from submitting normally */
		   event.preventDefault();


		  /* Send the data using post and put the results in a div */
		  console.log("LEKARZ PRZYCISK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1");
		  lekarz_id = $(this).data("lekarzid");
		  // console.log("lekarzid");
		  // console.log(lekarz_id);

	      			  
		// wyslij zapytanie ajax i odczytaj wizyty danego lekarza
	    $.ajax({
	      url: "zarejestruj_wizyte/lista_wizyt",
	      type: "post",
	      // dataType: 'script',
	      dataType: "json",
	      data: {lekarzid: lekarz_id },
	      // data: {lekarzid: lekarz_id, data: "2016-02-05", godzina: 7},
	      success: function(wizyty){
			// tenKalendarz.ustawPierwszDzienTygodniaNaTeraz();
	      	console.log(wizyty);	
	        console.log('Odczyt z JS lista_wizyt');
	        
	      },
	      error: function (xhr, ajaxOptions, thrownError) {
	        alert(xhr.status);
	        alert(thrownError);
	      }
	    });
	});
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////