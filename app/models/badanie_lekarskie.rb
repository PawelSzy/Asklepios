class BadanieLekarskie < ActiveRecord::Base
  belongs_to :pokoj
  belongs_to :lekarz
  belongs_to :pacjent
  belongs_to :specjalizacja

  validates :pokoj_id, presence: true
  validates :lekarz_id, presence: true
  validates :specjalizacja_id, presence: true
  validates :data, presence: true, validates_date: true     
  validates :godzina, presence: true, numericality: { :greater_than_or_equal_to  => 0, :less_than => 24 } 


end
