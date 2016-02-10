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

function ileDniOdPoniedzialku(data) {
	dzien = data.getDay();
	if (dzien === 0) {
		return 7;
	}
	else {
		return dzien -1;
	}
}

//Obsluga kalendarza
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//funkcja odpowiada za pobranie danych ktore ustawiaja pierwszy dzien kalendarza


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


//dodaj obsluge przyciskow Lekarzy - pobierz wizyt danego lekarza
kalendarz.prototype.przyciskiLekarza = function() {
	tenKalendarz = this;
	$(".przycisk_lekarza").click(function(event) {

		  /* stop form from submitting normally */
		   event.preventDefault();


		  /*wypelnij kalendarz wizytami lekarza o podanym id */
		  lekarz_id = $(this).data("lekarzid");
		  tenKalendarz.lekarz_id = lekarz_id;
		  tenKalendarz.wypelnijWizytyLekarza(lekarz_id);

	});

}

kalendarz.prototype.wypelnijWizytyLekarza = function(lekarz_id) {
	console.log("wypelnijWizytyLekarza!!!!!!!!!!!!!111");
	if (lekarz_id === null) {
		return false;
	};
	tenKalendarz = this;	
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
        tenKalendarz.wypelnijWizyty(wizyty);
        
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      }
    });	
}

//funckcja wypelnia kalendarz danymi wizytami
kalendarz.prototype.wypelnijWizyty = function(wizyty) {
	console.log("Funkcja wizyty");
	dataPon = this.pierwszyDzienTygodnia;
	dataNiedzie = this.niedzielaTygodnia;
	tenKalendarz = this;
	wizyty.forEach(function(wizyta) {
		wizytaData = new Date(wizyta.data);
		//wyswietl tylko jesli wizyta ma date znajdujacy sie w wyswietlanym tygodniu na kalendarzu
		if  (dataPon  < wizytaData  && wizytaData < dataNiedzie) {
			console.log("wizyta w tym tygodniu:");
			console.log(wizyta);
			console.log("ilosc dni OD Poniedzialku");
			console.log(ileDniOdPoniedzialku(wizytaData));
			ileDniOdPon = ileDniOdPoniedzialku(wizytaData);
			godzinaWizyty = wizyta.godzina;


			id_dnia = "godz" + godzinaWizyty + "dzien"+ileDniOdPon;
			console.log(id_dnia);

			//wyswietl checbock w danej komorce kalendarza
			$( "#"+id_dnia ).html("<span  class='custom-checkbox'></span>");

			//ustaw godzine i date w danej komorce
			$("#"+id_dnia).attr('data-date', wizytaData);
			$("#"+id_dnia).attr('data-godzinaWizyty', godzinaWizyty);

			//ustaw funkcje ktora uruchamia sie po nacisnieciu checkboxa			
			tenKalendarz.clickPacjentWybieraWizyte(id_dnia, wizyta);
		};
	});
}

//funkcja odczytuje aktualnie zalogowanego pacjenta
//funccja zwraca JSON zawierajacy dane Pacjenta ktory jest zalogowany
kalendarz.prototype.zalogowanyPacjent = function() {
	//odczytaj dane aktualnie zalogowanego pacjenta 
	pacjent = null;
     $.ajax({
      url: "podajzalogowanegopacjenta",
      type: "get",
      dataType: "json",
      success: function(zalogowany_pacjent){
		// tenKalendarz.ustawPierwszDzienTygodniaNaTeraz();
        console.log('Zalogowany pacjent:');
      	console.log(zalogowany_pacjent);	
      	if (zalogowany_pacjent !== null) {
      		pacjent = zalogowany_pacjent;
      		console.log(pacjent);
      		return pacjent;
      	}
        
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
        // pacjent = null;
      }
    });

    return pacjent;	 
}


kalendarz.prototype.zapiszPacjentaNaWizyte = function(wizyta) {
	//Wyslij 
    $.ajax({
      url: "zapiszpacjentanawizyte",
      type: "get",
      dataType: "json",
      data: {pacjentid: wizyta.pacjent_id, wizytaid: wizyta.id },
      // data: {lekarzid: lekarz_id, data: "2016-02-05", godzina: 7},
      success: function(zapisana_wizyta){
		// tenKalendarz.ustawPierwszDzienTygodniaNaTeraz();
      	console.log("wizyta przed zapisaniem pacjenta:");			
      	console.log(wizyta);	
      	console.log("zapisana_wizyta:");
      	console.log(zapisana_wizyta)  ;     
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      }
    });	
}


//funkcja wypisuje pacjenta z wizyty
//@start json wizyta 
kalendarz.prototype.wypiszPacjent = function(wizyta) {
    $.ajax({
      url: "zapiszpacjentanawizyte",
      type: "get",
      dataType: "json",
      data: {wizytaid: wizyta.id },
      // data: {lekarzid: lekarz_id, data: "2016-02-05", godzina: 7},
      success: function(wypisana_wizyta){
		// tenKalendarz.ustawPierwszDzienTygodniaNaTeraz();
      	console.log("wizyta przed wypisanie pacjenta:");			
      	console.log(wizyta);	
      	console.log("wizyta po wypisaniu:");
      	console.log(wypisana_wizyta)  ;     
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      }
    });		
}

//funkcja umozliwia zaznaczenie wizyty przez Pacjenta poprzez wybranie odpowiedniej komorki
//do funkcji przekazujemy numer komorki 
kalendarz.prototype.clickPacjentWybieraWizyte = function(id_komorki_daty, wizyta) {


	pacjent = this.zalogowanyPacjent();
	tenKalendarz = this;

	$("#"+id_komorki_daty).click( function(){	
    	$("#"+id_komorki_daty).toggleClass('pjTsWeeklyIconSelected pjTsSelectorRemoveFromCart tsSelectorRemoveTimeslot');

    	data = $("#"+id_dnia).attr('data-date');
    	godzina = $("#"+id_dnia).attr('data-godzinaWizyty');

    	if ($("#"+id_komorki_daty).attr('class') == 'pjTsWeeklyIconAvailable pjTsSelectorAddToCart') {
    		//pacjent odznaczyl wizyte
    		console.log("Odznaczono date wizyte");  
    		tenKalendarz.wypiszPacjent(wizyta); 

    	} else if  ($("#"+id_komorki_daty).attr('class') == 'pjTsWeeklyIconAvailable pjTsSelectorAddToCart pjTsWeeklyIconSelected pjTsSelectorRemoveFromCart tsSelectorRemoveTimeslot') {
    		//pacjent zaznaczyl wizyte
    		console.log("Zaznaczono date wizyty");
    		tenKalendarz.zapiszPacjentaNaWizyte(wizyta);
    	}

	});	
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
