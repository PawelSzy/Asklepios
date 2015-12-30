class PacjentController < ApplicationController
	def show
		@pacjent = Pacjent.find(params[:id])
	end

	def new
		@pacjent = Pacjent.new
	end
end
