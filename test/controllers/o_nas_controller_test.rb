require 'test_helper'

class ONasControllerTest < ActionController::TestCase
  test "should get O_Nas" do
    get :O_Nas
    assert_response :success
  end

end
