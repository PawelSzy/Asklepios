class PokojsController < ApplicationController
def show
	@pokoj = Pokoj.find(params[:id])
end

  def new
  	@pokoj = Pokoj.new
  end
end
