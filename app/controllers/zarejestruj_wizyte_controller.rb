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
		@lekarze = Lekarz.where( "specjalizacja_id", @specjalizacja.id ).select("id")
		@wizyty = BadanieLekarskie.where(lekarz_id: "2")
		# [1, 2, 3, 4].map(&:to_s)
		@wizyty = BadanieLekarskie.where("lekarz_id IN (?)", @lekarze.map(&:id) )
		@wizyty = @wizyty.map(&:specjalizacja_id)


   		respond_to do |format|
      		format.html
      		format.js
    	end		
	end


end
