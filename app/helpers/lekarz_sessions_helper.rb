module LekarzSessionsHelper
	# Zalogowuje lekarza
	def zaloguj_lekarz(lekarz)
    	session[:lekarz_id] = lekarz.id
  	end

  # zwraca aktualnego lekarza jeśli jest zalogowany lub jeśli istnieje
  def aktualny_lekarz
    @aktualny_lekarz ||= Lekarz.find_by(id: session[:lekarz_id])
  end  	

  # Zwraca True jeśli lekarz jest zalogowany
  def zalogowany_lekarz?
    !aktualny_lekarz.nil?
  end

    def wyloguj_lekarza
    session.delete(:lekarz_id)
    @aktualny_lekarz  = nil
  end



end
