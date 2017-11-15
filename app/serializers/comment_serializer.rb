class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text, :trip
  belongs_to :trip
end
