class Pacjent < ActiveRecord::Base
  before_save { self.email = email.downcase }	 	
  validates :imie,  presence: true, length: { maximum: 255 }
  validates :nazwisko, presence: true, length: { maximum: 255 }
  validates :pesel,  uniqueness: true, length: { is: 11 }, numericality: { :greater_than => 0 }
  validates :telefon, length: { maximum: 64 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: true  
  has_secure_password
  validates :password, presence: true, length: { minimum: 6 }

  # Zwraca hash digest przeslanego stringa
  def Pacjent.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

end
