require 'test_helper'

class SpecjalizacjaTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

    def setup
    @specjalizacja = Specjalizacja.new(
      nazwa_specjalizacji: "Ortopedia test",
    	)
  end

  test "should be valid" do
    assert @specjalizacja.valid?
  end


    test "spacjalizacja powinno byc obecne" do
    @specjalizacja.nazwa_specjalizacji = "     "
    assert_not @specjalizacja.valid?
  end


   test "spacjalizacja nie powinno byc zbyt dlugie" do
    @specjalizacja.nazwa_specjalizacji = "a" * 256
    assert_not @specjalizacja.valid?
end

  test "specjalizacja powinnien byc unikalny" do
    @duplicate_specjalizacja = @specjalizacja.dup
    @specjalizacja.save
    assert_not @duplicate_specjalizacja.valid?
  end

end
