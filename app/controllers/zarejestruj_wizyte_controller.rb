class ZarejestrujWizyteController < ApplicationController
	def show
		@specjalizacje = Specjalizacja.all
 
		# @lekarz = Lekarz.find(params[:id])
		# specjalizacja_id = @lekarz.specjalizacja_id
		# @specjalizacja = Specjalizacja.find(specjalizacja_id)
	end

	def new
	
	end		


	def listaWizyt
			lekarzID = params[:lekarzid]
			# data = params[:data]
			# godzina = params[:godzina]
			# @zmienna = [lekarzID, data, godzina]

			@lekarz = Lekarz.find(lekarzID)
			@wizyty = BadanieLekarskie.where("lekarz_id IN (?)", @lekarz.id )

	   		respond_to do |format|
      			format.html
      			# format.json { render :response => {:name => name, :message => message} }
      			format.json  { render json: @wizyty }
      			format.js
    		end	
	end

	def create
		@specjalizacja = Specjalizacja.find(params[:specjalizacja_id])
		# @lekarze = Lekarz.where(specjalizacja_id: "1")
	
		# @lekarz= Specjalizacja.find(params[:lekarz_id]);
		# puts @lekarz

		@lekarze = Lekarz.where( specjalizacja_id:  @specjalizacja.id ).select("id")
		# @wizyty = BadanieLekarskie.where(lekarz_id: "2")
		# [1, 2, 3, 4].map(&:to_s)
		@wizyty = BadanieLekarskie.where("lekarz_id IN (?)", @lekarze.map(&:id) )

		@wizyty_godzina = @wizyty.map(&:godzina)
		@wizyty_data = @wizyty.map(&:data)

   		respond_to do |format|
      		format.html
      		format.js
    	end		
	end

	def zapiszPacjentaNaWizyte
		wizytaId = params[:wizytaid]
		pacjentId = params[:pacjentid]
		@wizyta = BadanieLekarskie.find(wizytaId)
		puts @wizyta, @wizyta.pacjent_id
		@wizyta.pacjent_id = pacjentId
		puts @wizyta, @wizyta.pacjent_id
		@wizyta.save
		puts @wizyta, @wizyta.pacjent_id
   		respond_to do |format|
  			# format.json { render :response => {:name => name, :message => message} }
  			format.json  { render json: @wizyta }
		end			
	end


end
