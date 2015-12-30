class LekarzController < ApplicationController
	def show
		@lekarz = Lekarz.find(params[:id])
	end

	def new
	end
end
