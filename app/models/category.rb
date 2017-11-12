class Category <  ActiveRecord::Base
  has_many :trip_categories
  has_many :trips, through: :trip_categories
  accepts_nested_attributes_for :trips

  validates :name, presence: true

  def trips_attributes=(trip_attribute)
    self.trips.ids << trip_attribute.id
  end

end
