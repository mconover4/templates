class CommentsController < ApplicationController

  def index
    @comments = Comment.all
    render json: @comments
  end

  def create
    @comment = Comment.create(comments_params)
    render json: @comment, status: 201
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    render json: @comment
  end

  private

  def comments_params
    params.require(:comment).permit(:text, :trip_id, :user_id)
  end

end
