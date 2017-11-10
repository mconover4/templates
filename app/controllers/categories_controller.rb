class CategoriesController < ApplicationController
  before_action :must_log_in

  def new
    @category = Category.new
    @categories = Category.all
    @trip_category = TripCategory.new

  end

  def create
    @category = Category.new(category_params)
    @trip_category = TripCategory.new(:note => params[:note])
    if @category.save
      redirect_to categories_path
    else
      render :new
    end
  end

  def show
    @category = Category.find(params[:id])
  end

  def edit
    @category = Category.find(params[:id])
  end

  def update
    @category = Category.find(params[:id])
    if @category.update(category_params)
      redirect_to categories_path
    else
      render :edit
    end
  end

private
def category_params
  params.require(:category).permit(:id, :name, trip_categories_attributes: [:note], trip_category_attributes: [:note])
end

end
