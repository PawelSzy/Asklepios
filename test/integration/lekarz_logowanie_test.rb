require 'test_helper'

class LekarzLogowanieTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  test "zaloguj sie jako lekarz z nieudanym logowaniem" do
    get zaloguj_lekarz_path
    assert_template 'lekarz_sessions/new'
    post zaloguj_lekarz_path, session: { pesel: "", password: "" }
    assert_template 'lekarz_sessions/new'
    assert_not flash.empty?
    get root_path
    assert flash.empty?
  end

  def setup
    @lekarz = lekarzs(:Religa)
  end

  test "Zaloguj się jako lekarz z właściwymi danymi" do
    get zaloguj_lekarz_path
    post zaloguj_lekarz_path, session: { pesel: 12345678902, password: 'haslotest' }
    assert_redirected_to @lekarz
    follow_redirect!
    assert_template 'lekarzs/show'
    assert_select "a[href=?]", zaloguj_lekarz_path, count: 0
    assert_select "a[href=?]", wyloguj_lekarz_path

  end

end
