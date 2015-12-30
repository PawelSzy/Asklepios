class PacjentsController < ApplicationController
	def show
		@pacjent = Pacjent.find(params[:id])
	end

	def new
		@pacjent = Pacjent.new
	end

	 def create
	    @pacjent = Pacjent.new(params[:pacjent])    # Not the final implementation!
	    if @pacjent.save
	      # Handle a successful save.
	    else
	      render 'new'
	    end
  end
end
