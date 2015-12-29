class PacjentController < ApplicationController
	def show
		@pacjent = Pacjent.first
	end

	def new
	end
end
