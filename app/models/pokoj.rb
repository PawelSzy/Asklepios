class Pokoj < ActiveRecord::Base
	validates :numer_pokoju,  presence: true, length: { maximum: 255 }, uniqueness: true
	has_many :badanie_lekarskies
end
