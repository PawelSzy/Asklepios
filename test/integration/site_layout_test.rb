require 'test_helper'

class SiteLayoutTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  test "layout O_nas" do
  	get "/o_nas"
    assert_template 'o_nas/O_Nas'
    assert_select "a[href=?]", '/o_nas'
  end  
end
