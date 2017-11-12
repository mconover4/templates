class Comment < ApplicationRecord
  belongs_to :trip, optional: true
end
