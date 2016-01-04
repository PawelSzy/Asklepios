require 'test_helper'

class NowaSpecjalizacjaTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  test "niewlasciwe tworzenie nowej specjalizacji" do
    get '/nowa_specjalizacja'
    assert_no_difference 'Specjalizacja.count' do
      post_via_redirect specjalizacjas_path, specjalizacja: { nazwa_specjalizacji:  "" }
    end
    assert_template 'specjalizacjas/new'  
  end

  test "wlasciwe tworzenie nowej specjalizacji" do
    get '/nowa_specjalizacja'
    assert_difference 'Specjalizacja.count', 1 do
      post_via_redirect specjalizacjas_path, specjalizacja: { nazwa_specjalizacji:  "Laryngolog" }
    end
    assert_template 'specjalizacjas/show'  
  end  
end
