require 'test_helper'

class PacjentSessionsControllerTest < ActionController::TestCase
  test "should get Controler" do
    get :Controler
    assert_response :success
  end

  test "should get new" do
    get :new
    assert_response :success
  end

end
