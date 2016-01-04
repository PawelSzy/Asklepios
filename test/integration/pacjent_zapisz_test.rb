require 'test_helper'

class PacjentZapiszTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  test "niewlasciwe tworzenie nowego uzytkownika" do
    get '/zarejestruj_sie'
    assert_no_difference 'Pacjent.count' do
      post_via_redirect pacjents_path, pacjent: { imie:  "Imie Testowe",
                                            email: "mail@@niewlasciwy",
                                            password:              "foo",
                                            password_confirmation: "foo2" }
    end
    assert_template 'pacjents/new'
  end
  test "wlasciwe tworzenie nowego uzytkownika" do
    get '/zarejestruj_sie'
     assert_difference 'Pacjent.count', 1 do
      post_via_redirect pacjents_path, pacjent: { imie:  "Imie Testowe",
                                            nazwisko:  "Nazwisko Testowe",
                                            email: "mail@nlasciwy.com",
                                            pesel: 98765432101,
                                            password:              "haslotest",
                                            password_confirmation: "haslotest" }
  end
    assert_template 'pacjents/show'
    assert czy_zalogowany_pacjent?
  end
end  

