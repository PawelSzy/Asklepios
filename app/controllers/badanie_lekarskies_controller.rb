class BadanieLekarskiesController < ApplicationController

  def show
    @badanie = BadanieLekarskie.find(params[:id])

  end
end
