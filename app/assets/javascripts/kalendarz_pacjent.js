

//Funkcje odpowiedzialne za obsluge Pacjenta
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



kalendarz.prototype.ustawKalendarzPacjenta = function() {

  this.typKalendarza = "Pacjent_Kalendarz";

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




  //funckcja wypelnia kalendarz danymi wizytami
  this.wypelnijWizytyDlaClickPacjenta = function(wizyty) {
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
        komorkaUstawDataGodzine(id_komorki, wizytaData, godzinaWizyty)

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

          alert("Wypisales sie z umowionej wizyty lekarskiej")  ;

          console.log("czyToWizytaPacjenta:");
          console.log( czyToWizytaPacjenta(wizyta, pacjent) ); 

        } else if ( czyKomorkaZaznaczona(id_komorki_daty) ) {
          //pacjent zaznaczyl wizyte
          console.log("Zaznaczono date wizyty");       
          zapiszPacjentaNaWizyte(wizyta);
          console.log(wizyta);
          alert("Zapisales się na wizytę u lekarza: "+"\n data wizyty "+ wizyta.data + "\ngodzina wizyty "+wizyta.godzina);//+Lekarz.imie.+" "+Lekarz.nazwisko +"\n data wizyty: "+data+" godzina: "+godzina );          
        }

    }); 
  }

  // uruchom obsluge przyciskow lekarza
  this.przyciskiLekarza() ;
}
