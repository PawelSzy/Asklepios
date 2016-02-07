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



	dzisiajData = new Date();
	this.pierwszyDzienTygodnia = ostatniPoniedzialek(dzisiajData);
	

	dataNiedzie = new Date(this.pierwszyDzienTygodnia.valueOf() );
	dataNiedzie.setDate(this.pierwszyDzienTygodnia.getDate() + 6);	
	this.niedzielaTygodnia = dataNiedzie ;

	this.wypelnijKalendarz();

}


// Funkcja wypełnia kalendarz zaznaczonymi wizytami, wolnymi wizytami, 
// -- oznacza ze to miniony dzien
// X - zajeta godzina wizyty
// kwadrat - wolne miejsce
kalendarz.prototype.wypelnijKalendarz = function() {

	dzisiajData = new Date();

	dataPon = this.pierwszyDzienTygodnia;
	dataNiedzie = this.niedzielaTygodnia;

	if ( dzisiajData < dataNiedzie && dzisiajData < dataPon ) {
		this.wypelnijMinionyTydzien();
	}
	else if ( dzisiajData < dataPon) {
		this.wypelnijNastepnyTydzien();
	}

	else {
	//iteruj po elementach kalendarza ktore maja stare daty
		this.wypelnijAktualnyTydzien();
	}		
}

kalendarz.prototype.wypelnijMinionyTydzien = function() {
	console.log("Miniony tydzien");
}

kalendarz.prototype.wypelnijNastepnyTydzien = function() {
	console.log("Nastepny tydzien");
}

kalendarz.prototype.wypelnijAktualnyTydzien = function() {
	console.log("Aktualny tydzien");
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////