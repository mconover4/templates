class TripCategorySerializer < ActiveModel::Serializer
  attributes :id, :trip_id, :category_id
  belongs_to :trip
  belongs_to :category
end
