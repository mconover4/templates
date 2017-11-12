class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :trips
  has_many :trips, :through => :trip_categories
end
