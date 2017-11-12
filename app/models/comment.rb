class Comment < ActiveRecord::Base
  belongs_to :trip#, optional: true

  def self.current_comments
    self.joins(:trips).where(:trips => { :id => :trip_id })
    #@trip = self.trip_id
    #self.where(trip[:id] = @trip )
  end
end
