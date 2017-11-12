class CommentsController < ApplicationController
  before_action :find_trip

  def new
    @comment = Item.new
  end

  def index
    @comments = @trip.comments
    render json: @comments
  end

  def create
    @comment = @trip.comments.build(comment_params)
    if @comment.save
      render json: @comment
    else
      render json: @comment.errors.full_messages
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    render json: @comment
  end

  private

  def comments_params
    params.require(:comment).permit(:id, :text, :trip_id, :user_id)
  end

  def find_trip
      @trip = Trip.find_by(id: params[:trip_id])
    end


end
