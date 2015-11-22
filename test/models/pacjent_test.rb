require 'test_helper'

class PacjentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  def setup
    @pacjent = Pacjent.new(
      imie: "imie_test",
      nazwisko: "nazwisko_test",
      email: "foo@gmail.com",
      telefon: "485811122233", 
      pesel: "80070902011",
      notatki: "tekst notatki"
    	)
  end

  test "should be valid" do
    assert @pacjent.valid?
  end

  test "imie powinno byc obecne" do
    @pacjent.imie = "     "
    assert_not @pacjent.valid?
  end

  test "nazwisko powinno byc obecne" do
    @pacjent.nazwisko = "     "
    assert_not @pacjent.valid?
  end

  test "Pesel powinnien byc unikalny" do
    @duplicate_pacjent = @pacjent.dup
    @pacjent.save
    assert_not @duplicate_pacjent.valid?
  end

   test "imie nie powinno byc zbyt dlugie" do
    @pacjent.imie = "a" * 256
    assert_not @pacjent.valid?
  end
  
     test "nazwisko nie powinno byc zbyt dlugie" do
    @pacjent.nazwisko = "a" * 256
    assert_not @pacjent.valid?
  end

  test "email nie powinniec byc zbyt dlugie" do
    @pacjent.email = "a" * 244 + "@example.com"
    assert_not @pacjent.valid?
  end 

  test "telefon powinien byc numeryczny" do
    @pacjent.telefon = "abz"
    assert_not @pacjent.valid?
  end   

test "email validation akceptacja tylko dobrego email" do
    valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org
                         first.last@foo.jp alice+bob@baz.cn]
    valid_addresses.each do |valid_address|
      @pacjent.email = valid_address
      assert @pacjent.valid?, "#{valid_address.inspect} powinno być valid"
    end
end

  test "email validation odrzucenie niewlasciwego adresu email" do
    invalid_addresses = %w[user@example,com user_at_foo.org user.name@example.
                           foo@bar_baz.com foo@bar+baz.com]
    invalid_addresses.each do |invalid_address|
      @pacjent.email = invalid_address
      assert_not @pacjent.valid?, "#{invalid_address.inspect} should be invalid"
    end
  end  



end
