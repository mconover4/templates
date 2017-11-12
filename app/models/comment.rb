class Comment < ActiveRecord::Base
  belongs_to :trip#, optional: true
end
