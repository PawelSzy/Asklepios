class BadanieLekarskiesController < ApplicationController

  def show
    @badanie = BadanieLekarskie.find(params[:id])
  end

  def new
  	 if not zalogowany_lekarz?
   		flash[:success] = "Zaloguj się"
  		redirect_to '/zaloguj_lekarz'
    end
	@badanie = BadanieLekarskie.new
  end

 def create
    @badanie = BadanieLekarskie.new(badanie_params)
    if zalogowany_lekarz?
    	@badanie.lekarz_id = aktualny_lekarz.id
    end
    @badanie.godzina = params[:godzina].to_i
 	@badanie.specjalizacja_id = aktualny_lekarz.specjalizacja_id
    @badanie.godzina = params[:badanie_lekarskie][:godzina].to_i
    year = params[:date][:year]
    month = params[:date][:month]
    day = params[:date][:day]  
    @badanie.data =  Date.new(2016, 03, 25)
    if @badanie.save
  		flash[:success] = "Utworzono datę nowej wizyty"
  		redirect_to @badanie
    else
      render 'new'
    end
 end

def badanie_params
  params.require(:badanie).permit(:pokoj_id, :lekarz_id, :specjalizacja_id, :year, :month, :day, :godzina, :date)
end

end
