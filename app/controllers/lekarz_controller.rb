class LekarzController < ApplicationController
	def show
		@lekarz = Lekarz.first
	end

	def new
	end
end
