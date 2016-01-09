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
      data: "2016-06-12", 
      godzina: 1,
      pacjent_id: 1
    	)
  end

 test "should be valid" do
    assert @badanie.valid?
  end

 test "pokoj_id powinnien być obecny" do
    @badanie.pokoj_id = nil
    assert_not @badanie.valid?
  end

 test "lekarz_id powinnien być obecny" do
    @badanie.lekarz_id = nil
    assert_not @badanie.valid?
  end

  test "specjalizacja_id powinnien być obecny" do
    @badanie.specjalizacja_id = nil
    assert_not @badanie.valid?
  end 

 test "data powinnna być obecny" do
    @badanie.data = nil
    assert_not @badanie.valid?
  end 

 test "data powinnna być obecna" do
    @badanie.godzina = nil
    assert_not @badanie.valid?
  end 

end
