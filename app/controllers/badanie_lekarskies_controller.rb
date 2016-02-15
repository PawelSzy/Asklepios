class BadanieLekarskiesController < ApplicationController

  def show
    @badanie_lekarskie = BadanieLekarskie.find(params[:id])
  end

  def new
  	 if not zalogowany_lekarz?
   		flash[:success] = "Zaloguj się"
  		redirect_to '/zaloguj_lekarz'
    end
	@badanie_lekarskie = BadanieLekarskie.new
  end

 def create
    @badanie_lekarskie = BadanieLekarskie.new(badanie_params)
    if zalogowany_lekarz?
    	@badanie_lekarskie.lekarz_id = aktualny_lekarz.id
    end
    # @badanie_lekarskie.godzina = params[:godzina].to_i
 	@badanie_lekarskie.specjalizacja_id = aktualny_lekarz.specjalizacja_id
    @badanie_lekarskie.godzina = params[:badanie_lekarskie][:godzina].to_i
    year = params[:date][:year]
    month = params[:date][:month]
    day = params[:date][:day]  
    @badanie_lekarskie.data =  Date.new(year.to_i, month.to_i, day.to_i)
    if @badanie_lekarskie.save
  		flash[:success] = "Utworzono datę nowej wizyty"
  		redirect_to @badanie_lekarskie
    else
      render 'new'
    end
 end

def badanie_params
  params.require(:badanie_lekarskie).permit(:pokoj_id, :lekarz_id, :specjalizacja_id, :year, :month, :day, :godzina, :date)
end

def kalendarz_lekarz
  # respond_to do |format|
  #   format.html
  #   format.js
  # end 
end


end
