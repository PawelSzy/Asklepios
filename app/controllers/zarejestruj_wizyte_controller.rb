class ZarejestrujWizyteController < ApplicationController
	def show
		@specjalizacje = Specjalizacja.all
 
		# @lekarz = Lekarz.find(params[:id])
		# specjalizacja_id = @lekarz.specjalizacja_id
		# @specjalizacja = Specjalizacja.find(specjalizacja_id)
	end

	def new
	end

	def create
		@specjalizacja = Specjalizacja.find(params[:specjalizacja_id])
		@lekarze = Lekarz.find_by specjalizacja_id: @specjalizacja.id
   		respond_to do |format|
      		format.html
      		format.js
    	end		
	end


end
