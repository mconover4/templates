class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text
  #belongs_to :trip
  # belongs_to :user
end
