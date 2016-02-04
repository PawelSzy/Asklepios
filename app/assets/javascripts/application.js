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



//Obsluga kalendarza
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function kalendarz() {
	this.miesiaceOdmiana = [ "stycznia", "lutego", "marca","kwietnia", "maja", "czerwica", "lipca", "sierpnia", "wrzesnia", "października", "listopada", "grudnia" ];
	this.godziny =(function(a,b){while(a--)b[a]=a+7;return b})(11,[]);
	this.iloscDniTygodnia = 7;	
	this.ustawOnlick();
	this.przyciskiLekarza();
	this.wypelnijKalendarz();


	this.pusta_komorka = "<p>-- </p>";

}
//funkcja odpowiada za pobranie danych ktore ustawiaja pierwszy dzien kalendarza
function pierwszyDzienKalendarza() {
	return $("#pierwszyDzienKalendarza").text();
}

pierwszyDzienKalendarza.UstawDzien = function(nowaData) {
	$("#pierwszyDzienKalendarza").text( nowaData );
}


kalendarz.prototype.pierwszyDzienKalendarza = pierwszyDzienKalendarza;

kalendarz.prototype.pierwszyDzienKalendarzaFormatJS = function() {
	date = this.pierwszyDzienKalendarza(); // $("#PoprzedniTydzien").attr("data-date");
	dataFormatJS =rubyDataIntoJS(date);

	return dataFormatJS;
}

//ustawia duzy napis u gory kalendarza pomiedzy strzalkami przechodzenia na nowy tydzien
kalendarz.prototype.ustawNaglowekDaty = function(text) {
	$("#naglowek_kal_daty").text(text);
}

//IN: 2016-01-05 - funkcja pobiera date w formie YYYY-MM-DD
//Out 5 stycznia - funckaj zwraca date w formacie cyfrowym
kalendarz.prototype.wyswietlTekstoweDaty = function(data) {
	nowaData = rubyDataIntoJS.prototype.splitData(data);
	miesiac = this.miesiaceOdmiana[ nowaData['month'] ];
	dzien = nowaData['day'];

	dataText = dzien + " " + miesiac;

	return dataText;
}

kalendarz.prototype.wyswietlDaty = function(data1, data2) {
	//konwertuj daty na text
	dataText1 = this.wyswietlTekstoweDaty(data1);
	dataText2 = this.wyswietlTekstoweDaty(data2);

	//polacz w jeden string
	text = dataText1 +" - " +dataText2;

	//wyswietl na kalendarzu
	this.ustawNaglowekDaty(text);
}

//Przesuwa date kalendarza o ustalona liczbe dni
kalendarz.prototype.przesunDate = function(przesunDni) {

	nowaData = this.pierwszyDzienKalendarzaFormatJS();

	//dodaj dni
	nowaData.setDate(nowaData.getDate() + przesunDni)
	// console.log("nowaData");	
	// console.log(nowaData);


	//ustaw wartości na strzałkach wskazujacych nowy i poprzedni tydzien
	//////////////////////////////////////////////////////////
	nastepnyPon = nowaData;
	nastepnyPon = jsDataIntoRuby(nastepnyPon);
	// console.log("przesuniety o tydzien nastepnyPon");
	// console.log(nastepnyPon);


	nastepnaNiedz = new Date(nowaData.valueOf() );
	nastepnaNiedz.setDate(nastepnaNiedz.getDate() + 6);
	nastepnaNiedz = jsDataIntoRuby(nastepnaNiedz);
	// console.log("przesunięta nastepnaNiedz");
	// console.log(nastepnaNiedz);

	$("#PoprzedniTydzien").attr("data-date", nastepnyPon);
	$("#NastepnyTydzien").attr("data-date", nastepnaNiedz);

	//ustaw pierwszy dzien ktory bedzie wyswietlany w kalendarzu
	this.pierwszyDzienKalendarza.UstawDzien(nastepnyPon);

	this.wyswietlDaty(nastepnyPon, nastepnaNiedz);
	this.wypelnijKalendarz();
	//////////////////////////////////////////////////////////	
}

kalendarz.prototype.nastepnyTydzien = function() {
	this.przesunDate(7);
}


kalendarz.prototype.poprzedniTydzien = function() {
	this.przesunDate(-7);
}

kalendarz.prototype.ustawOnlick = function() {
	console.log("OnClick");
	tenKalendarz = this;

	//przesun date tydzien do przodu gdy klikam przycisk od id="NastepnyTydzien"
	$("#NastepnyTydzien").click( function(){
		console.log("pierwszyDzienKalendarza przod: ");
		console.log(pierwszyDzienKalendarza());  	
    	tenKalendarz.nastepnyTydzien();
		console.log("pierwszyDzienKalendarza2 przed: ");
		console.log(pierwszyDzienKalendarza());     	
  	
	});

	//przesun date tydzien do tylu gdy klikam przycisk od id="PoprzedniTydzien"
	$("#PoprzedniTydzien").click( function(){
		console.log("pierwszyDzienKalendarza tyl: ");	
    	console.log(pierwszyDzienKalendarza()); 		
    	tenKalendarz.poprzedniTydzien();
		console.log("pierwszyDzienKalendarza tyl2: ");	
    	console.log(pierwszyDzienKalendarza()); 

	});


	//Funkcja wypełnia kalendarz zaznaczonymi wizytami, wolnymi wizytami, 
	// -- oznacza ze to miniony dzien
	// X - zajeta godzina wizyty
	// kwadrat - wolne miejsce
	kalendarz.prototype.wypelnijKalendarz = function() {
		//wypelnij minione dni znakiem "--"
		/////////////////////////////////////

		//sprawdz dzisiejszy dzien tygodnia
		timeNow = new Date;
		dzienTyg = timeNow.getDay();


		// console.log("wypelnijKalendarz");
		// console.log(dzienTyg);


		dataPon = this.pierwszyDzienKalendarzaFormatJS();

		dataNiedzie = new Date(dataPon.valueOf() );
		dataNiedzie.setDate(dataPon.getDate() + 6);
		console.log("dataNiedzie: ");
		console.log(dataNiedzie);


		if ( dataNiedzie < timeNow ) {
			this.wypelnijMinionyTydzien();
		}
		else if ( timeNow < dataPon) {
			this.wypelnijNastepnyTydzien();
		}

		else {
		//iteruj po elementach kalendarza ktore maja stare daty
			this.wypelnijAktualnyTydzien();
		}	
		/////////////////////////////////////	

	}

	//zaznacz ze tydzien w kalendarzu juz minol i nie mozna nic robic
	//wszystkie kratki kalendarza sa zaznaczone jako "--"
	kalendarz.prototype.wypelnijMinionyTydzien = function() {
		console.log("tydzien poprzedni");
		for (index = this.iloscDniTygodnia; index > 0; --index) {
    	
    				this.godziny.forEach(function(godzina) {
					    // console.log(godzina);
					    id_dnia = "godz" + godzina + "dzien"+index
					    // console.log(id_dnia);
					    $( "#"+id_dnia ).html( "<p>-- </p>" );
					});
		}		
	}

	//wypelnia wizyty dla nastepnego tygodnia
	kalendarz.prototype.wypelnijNastepnyTydzien = function() {
		console.log("NastepnyTydzien");
		for (index = this.iloscDniTygodnia; index > 0; --index) {
    	
    				this.godziny.forEach(function(godzina) {
					    // console.log(godzina);
					    id_dnia = "godz" + godzina + "dzien"+index
					    // console.log(id_dnia);
					    $( "#"+id_dnia ).html( "<span class='custom-checkbox'></span></label>" );
					});
		}			
	}

	//Wypelnia wyzyty dla aktualnego tygodnia 
	kalendarz.prototype.wypelnijAktualnyTydzien = function() {
			for (index = this.iloscDniTygodnia; index > 0; --index) {
	    	
	    				this.godziny.forEach(function(godzina) {
						    // console.log(godzina);
						    id_dnia = "godz" + godzina + "dzien"+index
						    // console.log(id_dnia);
						    if ( index <= dzienTyg) { 
						    	$( "#"+id_dnia ).html( "<p>-- </p>" );
						    }
						    else {
						    	$( "#"+id_dnia ).html("<span class='custom-checkbox'></span></label>");
						    }
						});
			}
	}

}


kalendarz.prototype.przyciskiLekarza = function() {
	$(".przycisk_lekarza").click(function(event) {

		  /* stop form from submitting normally */
		   event.preventDefault();

		  /* get values from elements on the page: */
		   // var mdate = $('#mdate').val();
		   // var phone = $('#phone').val();

		  /* Send the data using post and put the results in a div */
		  console.log("LEKARZ PRZYCISK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1");
		  lekarz_id = $(this).data("lekarzid");
		  console.log("lekarzid");
		  console.log(lekarz_id);
	    $.ajax({
	      url: "zarejestruj_wizyte/lista_wizyt",
	      type: "post",
	      // dataType: 'script',
	      dataType: "json",
	      data: {lekarzid: lekarz_id },
	      // data: {lekarzid: lekarz_id, data: "2016-02-05", godzina: 7},
	      success: function(wizyty){
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