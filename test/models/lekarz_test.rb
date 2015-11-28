require 'test_helper'

class LekarzTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  def setup
    @lekarz = Lekarz.new(
      imie: "imie_test",
      nazwisko: "nazwisko_test",
      email: "foo@gmail.com",
      telefon: "485811122233", 
      pesel: "80070902011",
      password: "foobar777",
      password_confirmation: "foobar777"
    	)
  end

  test "should be valid" do
    assert @lekarz.valid?
  end

  test "imie powinno byc obecne" do
    @lekarz.imie = "     "
    assert_not @lekarz.valid?
  end

  test "nazwisko powinno byc obecne" do
    @lekarz.nazwisko = "     "
    assert_not @lekarz.valid?
  end

  test "Pesel powinnien byc unikalny" do
    @duplicate_lekarz = @lekarz.dup
    @lekarz.save
    assert_not @duplicate_lekarz.valid?
  end

   test "imie nie powinno byc zbyt dlugie" do
    @lekarz.imie = "a" * 256
    assert_not @lekarz.valid?
  end
  
     test "nazwisko nie powinno byc zbyt dlugie" do
    @lekarz.nazwisko = "a" * 256
    assert_not @lekarz.valid?
  end

  test "email nie powinniec byc zbyt dlugie" do
    @lekarz.email = "a" * 244 + "@example.com"
    assert_not @lekarz.valid?
  end 

  test "telefon powinien byc numeryczny" do
    @lekarz.telefon = "abz"
    assert_not @lekarz.valid?
  end   

test "email validation akceptacja tylko dobrego email" do
    valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org
                         first.last@foo.jp alice+bob@baz.cn]
    valid_addresses.each do |valid_address|
      @lekarz.email = valid_address
      assert @lekarz.valid?, "#{valid_address.inspect} powinno być valid"
    end
end

  test "email validation odrzucenie niewlasciwego adresu email" do
    invalid_addresses = %w[user@example,com user_at_foo.org user.name@example.
                           foo@bar_baz.com foo@bar+baz.com]
    invalid_addresses.each do |invalid_address|
      @lekarz.email = invalid_address
      assert_not @lekarz.valid?, "#{invalid_address.inspect} should be invalid"
    end
  end  


  test "haslo/password powinno byc obecne)" do
    @lekarz.password = @lekarz.password_confirmation = " " * 6
    assert_not @lekarz.valid?
  end

  test "haslo/password powinno miec minimalna dlugosc" do
    @lekarz.password = @lekarz.password_confirmation = "a" * 5
    assert_not @lekarz.valid?
  end

end
