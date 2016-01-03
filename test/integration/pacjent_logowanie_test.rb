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
end
