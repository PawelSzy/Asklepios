require 'test_helper'

class NowyLekarzTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  test "wlasciwe tworzenie nowego lekarza" do
    get '/nowy_lekarz'
    assert_no_difference 'Lekarz.count' do
      post_via_redirect lekarzs_path, lekarz: { name:  "Imie Testoe",
                                            email: "mail@@niewlasciwy",
                                            password:              "foo",
                                            password_confirmation: "foo2" }
    end
    assert_template 'lekarzs/new'
  end  
end
