require 'test_helper'

class PokojTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

    def setup
    @pokoj = Pokoj.new(
      numer_pokoju: "Ortopedia test",
    	)
  end

  test "should be valid" do
    assert @pokoj.valid?
  end


    test "pokoj powinno byc obecne" do
    @pokoj.numer_pokoju = "     "
    assert_not @pokoj.valid?
  end


   test "pokoj nie powinno byc zbyt dlugie" do
    @pokoj.numer_pokoju = "a" * 256
    assert_not @pokoj.valid?
end

  test "pokoj powinnien byc unikalny" do
    @duplicate_pokoj = @pokoj.dup
    @pokoj.save
    assert_not @duplicate_pokoj.valid?
  end

end
