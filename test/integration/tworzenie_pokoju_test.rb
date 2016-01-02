require 'test_helper'

class TworzeniePokojuTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  test "wlasciwe tworzenie nowego pokoju" do
    get '/nowy_pokoj'
    assert_no_difference 'Pokoj.count' do
      post_via_redirect pokojs_path, pokoj: { numer_pokoju:  "" }
    end
    assert_template 'pokojs/new'  
  end
end
