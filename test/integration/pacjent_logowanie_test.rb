require 'test_helper'

class PacjentLogowanieTest < ActionDispatch::IntegrationTest
  
  test "zaloguj sie jako pacjent z nieudanym logowaniem" do
    get zaloguj_path
    assert_template 'pacjent_sessions/new'
    post zaloguj_path, session: { pesel: "", password: "" }
    assert_template 'pacjent_sessions/new'
    assert_not flash.empty?
    get root_path
    assert flash.empty?
  end

  # def setup
  #   @pacjent = pacjents(:Eustachy)
  # end

  # test "Zaloguj się z właściwymi danymi" do
  #   get zaloguj_path
  #   post zaloguj_path, session: { pesel: 12345678902, password: 'haslotest' }
  #   assert_redirected_to @pacjent
  #   follow_redirect!
  #   assert_template 'pacjent_sessions/new'
  #   assert_select "a[href=?]", zaloguj_path, count: 0
  #   assert_select "a[href=?]", wyloguj_path
  #   # assert_select "a[href=?]", pacjent_path(@pacjent)
  # end


end
