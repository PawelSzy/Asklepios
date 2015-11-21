require 'test_helper'

class SiteLayoutTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  test "layout root, home links" do
  	get root_path
    assert_template 'strony/home'
    assert_select "a[href=?]", '/o_nas'
  end  

  test "layout O_nas links" do
  	get "/o_nas"
    assert_template 'o_nas/O_Nas'
    assert_select "a[href=?]", '/o_nas'
  end  

end
