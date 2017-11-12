class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :trips, :through => :trip_categories
end
