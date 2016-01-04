class LekarzSessionsController < ApplicationController
  def Controler
  end

  def new
  end

  def create
    lekarz = Lekarz.find_by(pesel: params[:session][:pesel])
    if lekarz && lekarz.authenticate(params[:session][:password])
      # Zaloguj lekarza i przekieruj go do strony lekarz pokaż
      zaloguj_lekarz lekarz
      redirect_to lekarz      
    else
      # Wyświetl błąd.
      flash.now[:danger] = 'Niewłaściwy Pesel Hub hasło'       
      render 'new'
    end
  end

  def destroy
    wyloguj_lekarza
    redirect_to root_url
  end  
end
