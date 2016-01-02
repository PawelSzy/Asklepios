require 'test_helper'

class NowaSpecjalizacjaTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  test "wlasciwe tworzenie nowej specjalizacji" do
    get '/nowa_specjalizacja'
    assert_no_difference 'Specjalizacja.count' do
      post_via_redirect specjalizacjas_path, specjalizacja: { nazwa_specjalizacji:  "" }
    end
    assert_template 'specjalizacjas/new'  
  end
end
