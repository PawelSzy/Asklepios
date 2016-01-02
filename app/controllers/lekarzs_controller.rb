class LekarzsController < ApplicationController
	def show
		@lekarz = Lekarz.find(params[:id])
	end


	def new
		@lekarz = Lekarz.new
	end

	 def create
	    @lekarz = Lekarz.new(lekarz_params)    # Not the final implementation!
	    if @lekarz.save
      		flash[:success] = "Dodano do bazy danych nowego Lekarza"
      		redirect_to @lekarz
	    else
	      render 'new'
	    end
  end


    def lekarz_params
      params.require(:lekarz).permit(:imie, :nazwisko, :pesel, :email, :password,
                                   :password_confirmation, :specjalizacja, :telefon)
    end

end
