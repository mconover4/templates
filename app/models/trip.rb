class Trip <  ActiveRecord::Base
  belongs_to :user
  has_many :trip_categories
  has_many :categories, through: :trip_categories
  has_many :comments

  validates :name, :content, presence: true
  validates :name, uniqueness: true, length: { minimum: 5 }
  validates :content, length: { minimum: 600 }

  def categories_attributes=(category_attributes)
    category_attributes.values.each do |category_attribute|
      category = Category.find_or_create_by(category_attribute)
      self.categories << category
    end
  end

end
