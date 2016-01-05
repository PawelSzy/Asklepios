class LekarzsController < ApplicationController
	def show
		@lekarz = Lekarz.find(params[:id])
		@specjalizacje = Specjalizacja.all
	end


	def new
		@lekarz = Lekarz.new
	    @specjalizacje = Specjalizacja.all
	end

	 def create
	    @lekarz = Lekarz.new(lekarz_params)

	    if @lekarz.save
      		flash[:success] = "Dodano do bazy danych nowego Lekarza"
      		zaloguj_lekarz @lekarz
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
