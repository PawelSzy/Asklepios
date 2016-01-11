class ZarejestrujWizyteController < ApplicationController
	def show
		@specjalizacje = Specjalizacja.all
		# @lekarz = Lekarz.find(params[:id])
		# specjalizacja_id = @lekarz.specjalizacja_id
		# @specjalizacja = Specjalizacja.find(specjalizacja_id)
	end
end
