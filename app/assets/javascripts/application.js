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

//funkcja odczytuje aktualnie zalogowanego pacjenta
//funccja zwraca JSON zawierajacy dane Pacjenta ktory jest zalogowany
zalogowanyPacjent = function() {
  //odczytaj dane aktualnie zalogowanego pacjenta 
  pacjent = null;

     $.ajax({
      url: "podajzalogowanegopacjenta",
      async: false,
      type: "get",
      dataType: "json",
      success: function(zalogowany_pacjent){
    // tenKalendarz.ustawPierwszDzienTygodniaNaTeraz();
        console.log('Zalogowany pacjent:');
        console.log(zalogowany_pacjent);  
        if (zalogowany_pacjent !== null) {
          pacjent = zalogowany_pacjent;
          console.log(pacjent);
          return pacjent
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


//funkcja odczytuje aktualnie zalogowanego lekarza
//funccja zwraca JSON zawierajacy dane Lekarza ktory jest zalogowany
zalogowanyLekarz = function() {
  //odczytaj dane aktualnie zalogowanego pacjenta 
  lekarz = null;

     $.ajax({
      url: "podajzalogowanegolekarza",
      async: false,
      type: "get",
      dataType: "json",
      success: function(zalogowany_lekarz){
    // tenKalendarz.ustawPierwszDzienTygodniaNaTeraz();
        console.log('Zalogowany zalogowany_lekarz:');
        console.log(zalogowany_lekarz);  
        if (zalogowany_lekarz !== null) {
          // pacjent = zalogowany_pacjent;
          // console.log(pacjent);
          lekarz = zalogowany_lekarz;
          return lekarz;
        }
        
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
        // pacjent = null;
      }
    });
    return lekarz;  
}



zapiszPacjentaNaWizyte = function(wizyta) {
  //Wyslij 
    $.ajax({
      url: "zapiszpacjentanawizyte",
      type: "get",
      dataType: "json",
      data: {pacjentid: wizyta.pacjent_id, wizytaid: wizyta.id },
      // data: {lekarzid: lekarz_id, data: "2016-02-05", godzina: 7},
      success: function(zapisana_wizyta){
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
wypiszPacjenta = function(wizyta) {
    $.ajax({
      url: "zapiszpacjentanawizyte",
      type: "get",
      dataType: "json",
      data: {wizytaid: wizyta.id },
      // data: {lekarzid: lekarz_id, data: "2016-02-05", godzina: 7},
      success: function(wypisana_wizyta){

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

//funckcja sprawdza czy sprawdzana wizyta (data wizyty) zostala zarezerwowana przez danego pacjenta
//@start obiekty wizyta  i pacjent
//@return true - jezeli wizyta zostala zarezerwowana przez pacjent; else - jesli nie zostala zarezerwoana
function czyToWizytaPacjenta(wizyta, pacjent) {
  if (wizyta.pacjent_id !== null && wizyta.pacjent_id === pacjent.id) {
    return true;
  } else {
    return false;
  }

}

//funckcja sprawdza czy sprawdzana wizyta (data wizyty) zostala zarezerwowana przez kogokolwiek
function czyWizytaNiezarezerowowana(wizyta) {
  if ( wizyta.pacjent_id === null ) {
    return true;
  }

  return false;

}


function wypiszLekarza(lekarz, data, godzina) {
  console.log("Wypisz Lekarza funkcja");

  console.log(lekarz, data, godzina);
  data = new Date(data);
  data = jsDataIntoRuby(data);

  lekarz_id = lekarz.id;
$.ajax({
  url: "lekarz_wypisz_sie_wizyta",
  type: "post",
  dataType: "json",
  data: {lekarz_id: lekarz_id, date: data, godzina: godzina, pokoj_id: "1" },
  // data: {lekarz_id: lekarz_id, data: "2016-02-21", godzina: 7, pokoj_id: "1"},
  success: function(zapisana_wizyta){
    console.log("utworzona_wizyta_przez Lekarza:");
    console.log(zapisana_wizyta)  ;     
  },
  error: function (xhr, ajaxOptions, thrownError) {
    alert(xhr.status);
    alert(thrownError);
  }
}); 

}

function zapiszWizyteLekarza(lekarz, data, godzina, pokoj_id) {
  console.log("zapisz Wizyte Lekarza funkcja");
      console.log(lekarz, data, godzina);
      data = new Date(data);
      data = jsDataIntoRuby(data);

      lekarz_id = lekarz.id;
    $.ajax({
      url: "lekarz_tworzy_wizyte",
      type: "post",
      dataType: "json",
      data: {lekarz_id: lekarz_id, date: data, godzina: godzina, pokoj_id: pokoj_id },
      // data: {lekarz_id: lekarz_id, data: "2016-02-21", godzina: 7, pokoj_id: "1"},
      success: function(zapisana_wizyta){
        console.log("utworzona_wizyta_przez Lekarza:");
        console.log(zapisana_wizyta)  ;     
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      }
    }); 

}




//Obsluga kalendarza
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Funckje odpowiadzialne za wyswietlanie kalendarza
// Automatycznie z czytane z pliku kalendarz.js 
//  require_tree powinno byc wlaczone


//Funkcje odpowiedzialne za obsluge Lekarza
//////////////////////////////////////////////////////
//  Funckje odpowiadzialne za dodanie funkcji - obsluga  kalendarza przez lekarza
// Automatycznie z czytane z pliku kalendarz_lekarz.js 
//  require_tree powinno byc wlaczone





//Funkcje odpowiedzialne za obsluge Pacjenta
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Funckje odpowiadzialne za dodanie funkcji - obsluga  kalendarza przez pacjenta
// Automatycznie z czytane z pliku kalendarz_pacjent.js 
//  require_tree powinno byc wlaczone

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
