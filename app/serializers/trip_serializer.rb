class TripSerializer < ActiveModel::Serializer
  attributes :id, :name, :content, :categories, :user_id, :categories
  belongs_to :user
  has_many :categories, :through => :trip_categories


  private
    def categories
      CategorySerializer.new(object.categories).attributes
    end
end
