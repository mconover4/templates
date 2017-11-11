class TripSerializer < ActiveModel::Serializer
  attributes :id, :name, :content, :categories, :user_id
  belongs_to :user

  private
    def categories
      CategorySerializer.new(object.categories).attributes
    end
end
