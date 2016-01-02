require 'test_helper'

class PacjentZapiszTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  test "wlasciwe tworzenie nowego uzytkownika" do
    get '/zarejestruj_sie'
    assert_no_difference 'Pacjent.count' do
      post_via_redirect pacjents_path, pacjent: { name:  "Imie Testoe",
                                            email: "mail@@niewlasciwy",
                                            password:              "foo",
                                            password_confirmation: "foo2" }
    end
    assert_template 'pacjents/new'
  end
end
