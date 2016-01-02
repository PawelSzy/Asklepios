class PacjentsController < ApplicationController
	def show
		@pacjent = Pacjent.find(params[:id])
	end

	def new
		@pacjent = Pacjent.new
	end

	 def create
	    @pacjent = Pacjent.new(pacjent_params)    # Not the final implementation!
	    if @pacjent.save
      		flash[:success] = "Utworzono nowego Pacjenta"
      		redirect_to @pacjent
	    else
	      render 'new'
	    end
  end


    def pacjent_params
      params.require(:pacjent).permit(:imie, :nazwisko, :pesel, :email, :password,
                                   :password_confirmation, :telefon, :notatki)
    end

end
