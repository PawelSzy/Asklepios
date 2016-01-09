class BadanieLekarskiesController < ApplicationController

  def show
    @badanie = BadanieLekarskie.find(1)
    @specjalizacja_id = @badanie.specjalizacja_id
 #    pokoj_id
 #    lekarz_id
	# pacjent_id	

    @specjalizacja = Specjalizacja.find(@specjalizacja_id)
  end
end
