class PacjentSessionsController < ApplicationController
  def Controler
  end

  def new
  end

  def create
    pacjent = Pacjent.find_by(pesel: params[:session][:pesel])
    if pacjent && pacjent.authenticate(params[:session][:password])
      # Zaloguj pacjenta i przekieruj go do strony pacjent pokaż
    else
      # Wyświetl błąd.
      flash.now[:danger] = 'Niewłaściwy Pesel Hub hasło'       
      render 'new'
    end
  end


  def destroy
  end
end
