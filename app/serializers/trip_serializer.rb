class TripSerializer < ActiveModel::Serializer
  attributes :id, :name, :content, :categories, :user_id, :comments
  belongs_to :user
  has_many :categories, :through => :trip_categories


  private
    def comments
      CommentSerializer.new(object.comments).attributes
    end
end
