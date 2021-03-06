ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...

  # Zwróc True jeżeli użytkownik jest zalogowany
  def czy_zalogowany_pacjent?
    !session[:pacjent_id].nil?
  end

def czy_zalogowany_lekarz?
	!session[:lekarz_id].nil?
  end
end
