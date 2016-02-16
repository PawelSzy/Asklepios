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
          // pacjent = zalogowany_pacjent;
          // console.log(pacjent);
          pacjent = zalogowany_pacjent;
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




//Obsluga kalendarza
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Funckje odpowiadzialne za wyswietlanie kalendarza
// Automatycznie z czytane z pliku kalendarz.js 
//  require_tree powinno byc wlaczone


//Funkcje odpowiedzialne za obsluge Lekarza
//////////////////////////////////////////////////////
kalendarz.prototype.ustawKalendarzLekarza = function() {
  ;
}



//Funkcje odpowiedzialne za obsluge Pacjenta
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



kalendarz.prototype.ustawKalendarzPacjenta = function() {

  //dodaj obsluge przyciskow Lekarzy - pobierz wizyt danego lekarza
  this.przyciskiLekarza = function() {
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


  this.wypelnijAktualnyTydzien = function() {
    console.log("Aktualny tydzien");
    this.wypelnijKalendarzPustymi();
    lekarz_id = this.lekarz_id
    if (lekarz_id !== null)
    {
      this.wypelnijWizytyLekarza(lekarz_id);
    }
  }

  this.wypelnijNastepnyTydzien = function() {
    console.log("Nastepny tydzien");
    this.wypelnijKalendarzPustymi();  
    lekarz_id = this.lekarz_id;
    if (lekarz_id !== null)
    {
      this.wypelnijWizytyLekarza(lekarz_id);
    }         
  }


  this.wypelnijWizytyLekarza = function(lekarz_id) {
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
  this.wypelnijWizyty = function(wizyty) {
    console.log("Funkcja wizyty");
    dataPon = this.pierwszyDzienTygodnia;
    dataNiedzie = this.niedzielaTygodnia;
    tenKalendarz = this;
    pacjent = zalogowanyPacjent();

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


        id_komorki = "godz" + godzinaWizyty + "dzien"+ileDniOdPon;

        //ustaw godzine i date w danej komorce
        $("#"+id_komorki).attr('data-date', wizytaData);
        $("#"+id_komorki).attr('data-godzinaWizyty', godzinaWizyty);

        //// Ustaw typy komorki - date w ktorej lekarz jest dostepny (istnieje wizyta)


        //sprawdz czy wizyta jest wolna (niezarezerwowana i wyswietl znak niezajetosci)
        if ( czyWizytaNiezarezerowowana(wizyta) ) {
        //wyswietle znak wizyty - data jest dostpena dla pacjenta
        komorkaZnakDostepnosci(id_komorki);

        //ustaw funkcje ktora uruchamia sie po nacisnieciu checkboxa      
        tenKalendarz.clickPacjentWybieraWizyte(id_komorki, wizyta);

        } 
        //jesli pacjent wczesniej zarezezerwowa date wizyty to wyswietl znak wybrano wizyte
        else if ( czyToWizytaPacjenta(wizyta, pacjent) ) {
          komorkaZnakWybrano(id_komorki);

        //ustaw funkcje ktora uruchamia sie po nacisnieciu checkboxa      
        tenKalendarz.clickPacjentWybieraWizyte(id_komorki, wizyta);
        
        }
        //data wizyty zostala wybrana przez innego pacjente - wyswietl znak "nie mozna wybrac danej daty"
        else { 
          komorkaZnakNiedostepna(id_komorki);
        }



      };
    });
  }


  //funkcja umozliwia zaznaczenie wizyty przez Pacjenta poprzez wybranie odpowiedniej komorki
  //do funkcji przekazujemy numer komorki 
  this.clickPacjentWybieraWizyte = function(id_komorki_daty, wizyta) {
   console.log(" clickPacjentWybieraWizyte:");

    pacjent = zalogowanyPacjent();
    console.log("pacjent clickPacjentWybieraWizyte:");  
    console.log(pacjent);
    


    wizyta.pacjent_id = pacjent.id;
    tenKalendarz = this;




    $("#"+id_komorki_daty).click( function(){ 
        komorkaZmienZaznaczOdznacz(id_komorki_daty);

        data = $("#"+id_dnia).attr('data-date');
        godzina = $("#"+id_dnia).attr('data-godzinaWizyty');

        if ( czyKomorkaOdznaczona(id_komorki_daty) ) {
          //pacjent odznaczyl wizyte
          console.log("Odznaczono date wizyte");  
          wypiszPacjenta(wizyta); 

          console.log("czyToWizytaPacjenta:");
          console.log( czyToWizytaPacjenta(wizyta, pacjent) ); 

        } else if ( czyKomorkaZaznaczona(id_komorki_daty) ) {
          //pacjent zaznaczyl wizyte
          console.log("Zaznaczono date wizyty");       
          zapiszPacjentaNaWizyte(wizyta);
        }

    }); 
  }

  // uruchom obsluge przyciskow lekarza
  this.przyciskiLekarza() ;
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
