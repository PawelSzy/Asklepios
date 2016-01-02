class SpecjalizacjasController < ApplicationController
	def show
		@specjalizacja = Specjalizacja.find(params[:id])
	end

	def new
	  	@specjalizacja = Specjalizacja.new
	end



	def new
		@specjalizacja = Specjalizacja.new
	end

	 def create
	    @specjalizacja = Specjalizacja.new(specjalizacja_params)
	    if @specjalizacja.save
      		flash[:success] = "Dodano do bazy danych nową specjalizacje"
      		redirect_to @specjalizacja
	    else
	      render 'new'
	    end
  	end


    def specjalizacja_params
      params.require(:specjalizacja).permit(:nazwa_specjalizacji)
    end
end
