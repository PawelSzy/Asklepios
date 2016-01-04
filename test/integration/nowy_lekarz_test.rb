require 'test_helper'

class NowyLekarzTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  test "niewlasciwe tworzenie nowego lekarza" do
    get '/nowy_lekarz'
    assert_no_difference 'Lekarz.count' do
      post_via_redirect lekarzs_path, lekarz: { name:  "Imie Testoe",
                                            email: "mail@@niewlasciwy",
                                            password:              "foo",
                                            password_confirmation: "foo2" }
    end
    assert_template 'lekarzs/new'
  end
  
  test "wlasciwe tworzenie nowego lekarza" do
    get '/nowy_lekarz'
     assert_difference 'Lekarz.count', 1 do
      post_via_redirect lekarzs_path, lekarz: { imie:  "Imie Testowe",
                                            nazwisko:  "Nazwisko Testowe",
                                            email: "mail@nlasciwy.com",
                                            pesel: 98765432101,
                                            password:              "haslotest",
                                            password_confirmation: "haslotest" }
  end
    assert_template 'lekarzs/show'
    # assert czy_zalogowany_lekarz?


  end  
end
