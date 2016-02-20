//Funkcje odpowiedzialne za obsluge Lekarza
//////////////////////////////////////////////////////
kalendarz.prototype.ustawKalendarzLekarza = function() {



  //Wypelnia wyzyty dla aktualnego tygodnia 
  kalendarz.prototype.wypelnijAktualnyTydzien = function() {
    console.log(this);
    this.wypelnijKalendarzPustymi();
    dzienTyg = this.dzisiajData.getDay();
    tenKalendarz = this;
    lekarz = zalogowanyLekarz();  

    ostatniPon = ostatniPoniedzialek(this.dzisiajData);   


    for (index = this.iloscDniTygodnia; index > 0; --index) {
      
            this.godziny.forEach(function(godzina) {
              // console.log(godzina);
              id_dnia = "godz" + godzina + "dzien"+index;

            //ustaw godzine i date w danej komorce
            dataKomorki = new Date();
            dataKomorki.setDate(pierwszyDzienTygodnia.getDate() + index-1); 
            komorkaUstawDataGodzine(id_dnia, dataKomorki, godzina);

            console.log(id_dnia, godzina, dataKomorki);            

    
              // console.log(id_dnia);
              if ( index <= dzienTyg) { 
                komorkaZnakBrakWyboru(id_dnia);
              }
              else {
                komorkaZnakDostepnosci(id_dnia);
                tenKalendarz.clickLekarzWybieraWizyte(id_dnia);
              }
            });
    }
  }


  this.wypelnijNastepnyTydzien = function() {
    console.log("Nastepny tydzien");
    this.wypelnijKalendarzPustymi();  
    lekarz_id = this.lekarz_id;
    lekarz = zalogowanyLekarz();   
    tenKalendarz = this; 

    pierwszyDzienTygodnia = this.pierwszyDzienTygodnia; 

    for (index = this.iloscDniTygodnia; index > 0; --index) {
          this.godziny.forEach(function(godzina) {
            // console.log(godzina);
            id_dnia = "godz" + godzina + "dzien"+index;


            //ustaw godzine i date w danej komorce
            dataKomorki = new Date();
            dataKomorki.setDate(pierwszyDzienTygodnia.getDate() + index-1); 
            komorkaUstawDataGodzine(id_dnia, dataKomorki, godzina);

             console.log(id_dnia, godzina, dataKomorki);
                       
            komorkaZnakDostepnosci(id_dnia);
            tenKalendarz.clickLekarzWybieraWizyte(id_dnia);
        });
    }    
    // if (lekarz_id !== null)
    // {
    //   ;
    //   // this.wypelnijWizytyLekarza(lekarz_id);
    // }         
  }


  //Funkcja - po kliknieciu danej komorka lekarz zaznacz wizyte
  this.clickLekarzWybieraWizyte = function(id_komorki_daty) {



    
    // $("#"+id_komorki_daty).off("click");    
    $("#"+id_komorki_daty).click( function(){ 


        // lekarz = zalogowanyLekarz()
        data = $("#"+id_komorki_daty).attr('data-date');
        godzina = $("#"+id_komorki_daty).attr('data-godzinaWizyty');     
         
        console.log(" clickLekarzWybieraWizyte:");
        komorkaZmienZaznaczOdznacz(id_komorki_daty);

        if ( czyKomorkaOdznaczona(id_komorki_daty) ) {
          //lekarz odznaczyl wizyte
          console.log("Odznaczono date wizyte");  
          wypiszLekarza(lekarz, data, godzina); 

          // console.log("czyToWizytaPacjenta:");
          // console.log( czyToWizytaPacjenta(wizyta, pacjent) ); 

        } else if ( czyKomorkaZaznaczona(id_komorki_daty) ) {
          //lekarz zaznaczyl wizyte
          console.log("Zaznaczono date wizyty");       
          zapiszWizyteLekarza(lekarz, data, godzina);
        }
    }); 
  }
}

