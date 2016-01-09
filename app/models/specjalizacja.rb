class Specjalizacja < ActiveRecord::Base
	validates :nazwa_specjalizacji,  presence: true, length: { maximum: 255 }, uniqueness: true
	has_many :lekarzs
	has_many :badanie_lekarskies, dependent: :destroy
end
