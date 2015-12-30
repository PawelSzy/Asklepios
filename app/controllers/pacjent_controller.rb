class PacjentController < ApplicationController
	def show
		@pacjent = Pacjent.first
	end

	def new
		@pacjent = Pacjent.new
	end
end
