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
  params.permit(:pokoj_id, :lekarz_id, :specjalizacja_id, :year, :month, :day, :godzina, :date)
end


def lekarz_tworzy_wizyte
  @badanie_lekarskie = BadanieLekarskie.new()
  if zalogowany_lekarz?
    @badanie_lekarskie.lekarz_id = aktualny_lekarz.id
  end
    # @badanie_lekarskie.godzina = params[:godzina].to_i
  @badanie_lekarskie.specjalizacja_id = aktualny_lekarz.specjalizacja_id
  @badanie_lekarskie.godzina = params[:godzina].to_i
  @badanie_lekarskie.lekarz_id = params[:lekarz_id].to_i
  @badanie_lekarskie.pokoj_id = params[:pokoj_id]
  @date = Date.parse(params[:date])

  year = @date.year
  month = @date.month
  day = @date.mday

  @badanie_lekarskie.data =  Date.new(year.to_i, month.to_i, day.to_i)  

  if @badanie_lekarskie.save
    respond_to do |format|
      format.json { render json: @badanie_lekarskie}
    end   
  else
    render json: {}
  end
end


def lekarz_wypisuje_sie_wizyta
  lekarz_id = params[:lekarz_id].to_i
  godzina = params[:godzina].to_i
  @date = Date.parse(params[:date])

  year = @date.year
  month = @date.month
  day = @date.mday
  @date =  Date.new(year.to_i, month.to_i, day.to_i)


  @badanie_lekarskie = BadanieLekarskie.where(lekarz_id: lekarz_id, data: @date, godzina: godzina).take

  if @badanie_lekarskie.destroy
     respond_to do |format|
      format.json { render json: @badanie_lekarskie}
    end   
  else
    render json: {}
  end   
end



def kalendarz_lekarz
  # respond_to do |format|
  #   format.html
  #   format.js
  # end 
end


end
