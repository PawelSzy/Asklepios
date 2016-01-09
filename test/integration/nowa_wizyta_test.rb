require 'test_helper'

class NowaWizytaTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
   test "sprobuj utworzyc nowa wizyte gdy nie jestes zalogowany" do
    delete wyloguj_lekarz_path
    #teraz powwino wykryc ze pacjent jest niezalogowany i przelaczyc do strony logowania dla lekarz
    get nowa_wizyta_path
    follow_redirect!
    assert_template 'lekarz_sessions/new'

    # assert_template 'pacjent_sessions/new'
    # post zaloguj_path, session: { pesel: "", password: "" }
    # assert_template 'pacjent_sessions/new'
    # assert_not flash.empty?
    # get root_path
    # assert flash.empty?
  end 

  def setup
    @lekarz = lekarzs(:Religa)
  end

   test "sprobuj utworzyc nowa wizyte gdy jestes zalogowany" do
  	get zaloguj_lekarz_path
  	assert_template 'lekarz_sessions/new'
    post zaloguj_lekarz_path, session: { pesel: 12345678902, password: 'haslotest' }
    assert_redirected_to @lekarz
    follow_redirect!
	assert_template 'lekarzs/show'
	get nowa_wizyta_path
	assert_template 'badanie_lekarskies/new'
	post badanie_lekarskies_path, date: { year:2016, month:06, day: 07}, badanie_lekarskie: { godzina: "4" }, badanie: {pokoj_id: 1}
	post badanie_lekarskies_path, badanie_lekarskie: { pokoj_id: 1, godzina: "4" }

	follow_redirect!
	assert_template 'badanie_lekarskies/show'
  end 

end
