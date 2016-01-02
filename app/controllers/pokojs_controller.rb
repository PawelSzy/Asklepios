class PokojsController < ApplicationController
	def show
		@pokoj = Pokoj.find(params[:id])
	end

	def new
	  	@pokoj = Pokoj.new
	end



	def new
		@pokoj = Pokoj.new
	end

	 def create
	    @pokoj = Pokoj.new(pokoj_params)
	    if @pokoj.save
      		flash[:success] = "Dodano do bazy danych nowy pokój"
      		redirect_to @pokoj
	    else
	      render 'new'
	    end
  	end


    def pokoj_params
      params.require(:pokoj).permit(:numer_pokoju)
    end

end
