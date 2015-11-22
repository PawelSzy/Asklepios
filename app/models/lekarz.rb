class Lekarz < ActiveRecord::Base
  validates :imie,  presence: true, length: { maximum: 255 }
  validates :nazwisko, presence: true, length: { maximum: 255 }
  validates :pesel, uniqueness: true, length: { is: 11 }
  validates :telefon, numericality: { :greater_than_or_equal_to => 0 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: true  	
end
