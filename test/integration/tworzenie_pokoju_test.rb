require 'test_helper'

class TworzeniePokojuTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  test "niewlasciwe tworzenie nowego pokoju" do
    get '/nowy_pokoj'
    assert_no_difference 'Pokoj.count' do
      post_via_redirect pokojs_path, pokoj: { numer_pokoju:  "" }
    end
    assert_template 'pokojs/new'  
  end

  test "wlasciwe tworzenie nowego pokoju" do
    get '/nowy_pokoj'
    assert_difference 'Pokoj.count', 1 do
      post_via_redirect pokojs_path, pokoj: { numer_pokoju:  901 }
    end
    assert_template 'pokojs/show'  
  end


end
