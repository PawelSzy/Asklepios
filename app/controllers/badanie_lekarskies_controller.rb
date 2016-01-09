class BadanieLekarskiesController < ApplicationController

  def show
    @badanie = BadanieLekarskie.find(params[:id])
  end

  def new
	@badanie = BadanieLekarskie.new
  end

 def create
    @badanie = BadanieLekarskie.new(badanie_params)
    # @badanie.date = nil
    @badanie.godzina = params[:godzina].to_i
    @badanie.lekarz_id =1
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
