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
    for (index = this.iloscDniTygodnia; index > 0; --index) {
      
            this.godziny.forEach(function(godzina) {
              // console.log(godzina);
              id_dnia = "godz" + godzina + "dzien"+index;
              // console.log(id_dnia);
              if ( index <= dzienTyg) { 
                komorkaZnakBrakWyboru(id_dnia);
              }
              else {
                komorkaZnakDostepnosci(id_dnia);
                tenKalendarz.clickLekarzWybieraWizyte(id_dnia, lekarz);
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
    for (index = this.iloscDniTygodnia; index > 0; --index) {
          this.godziny.forEach(function(godzina) {
            // console.log(godzina);
            id_dnia = "godz" + godzina + "dzien"+index;
            komorkaZnakDostepnosci(id_dnia);
            tenKalendarz.clickLekarzWybieraWizyte(id_dnia, lekarz);
        });
    }    
    // if (lekarz_id !== null)
    // {
    //   ;
    //   // this.wypelnijWizytyLekarza(lekarz_id);
    // }         
  }


  //Funkcja - po kliknieciu danej komorka lekarz zaznacz wizyte
  this.clickLekarzWybieraWizyte = function(id_komorki_daty, lekarz) {


    // // wizyta.pacjent_id = pacjent.id;
    tenKalendarz = this;
    // $("#"+id_komorki_daty).off("click");    
    $("#"+id_komorki_daty).click( function(){ 
        console.log(" clickLekarzWybieraWizyte:");
        komorkaZmienZaznaczOdznacz(id_komorki_daty);

        data = $("#"+id_dnia).attr('data-date');
        godzina = $("#"+id_dnia).attr('data-godzinaWizyty');

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

