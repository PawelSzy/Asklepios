require 'test_helper'

class BadanieLekarskieTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

def setup
    @badanie = BadanieLekarskie.new(
      pokoj_id: 1,
      lekarz_id: 1,
      specjalizacja_id: 1,
      data: DateTime.new(2005, 01, 01), 
      godzina: 1,
      pacjent_id: 1
    	)
  end

 test "should be valid" do
    assert @badanie.valid?
  end



end
