class PacjentSessionsController < ApplicationController
  def Controler
  end

  def new
  end

  def create
    pacjent = Pacjent.find_by(pesel: params[:session][:pesel])
    if pacjent && pacjent.authenticate(params[:session][:password])
      # Zaloguj pacjenta i przekieruj go do strony pacjent pokaż
      zaloguj_pacjent pacjent
      redirect_to pacjent      
    else
      # Wyświetl błąd.
      flash.now[:danger] = 'Niewłaściwy Pesel Hub hasło'       
      render 'new'
    end
  end


  def destroy
    wyloguj_pacjenta
    redirect_to root_url
  end

  def podajZalogowanegoPacjenta
    if zalogowany_pacjent? 
      respond_to do |format|
      # format.json { render :response => {:name => name, :message => message} }
        format.json  { render json: @aktualny_pacjent }
      end 
    else
      respond_to do |format|
      # format.json { render :response => {:name => name, :message => message} }
        format.json  { render json: [nil].to_json }
      end 
    end

  end

end
