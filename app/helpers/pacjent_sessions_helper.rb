module PacjentSessionsHelper

	# Zalogowuje pacjenta
	def zaloguj_pacjent(pacjent)
    	session[:pacjent_id] = pacjent.id
  	end

  # zwraca aktualnego pacjenta jeśli jest zalogowany lub jeśli istnieje
  def aktualny_pacjent
    @aktualny_pacjent ||= Pacjent.find_by(id: session[:pacjent_id])
  end  	

  # Zwraca True jeśli pacjent jest zalogowany
  def zalogowany_pacjent?
    !aktualny_pacjent.nil?
  end

    def wyloguj_pacjenta
    session.delete(:pacjent_id)
    @aktualny_pacjentaktualny_pacjent = nil
  end

end
