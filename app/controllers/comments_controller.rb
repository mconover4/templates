class CommentsController < ApplicationController

  def create
    @comment = Comment.create(comments_params)
    render json: @comment, status: 201
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    render json: @comment
  end

  def index
    @comments = Comment.all
    render json: @comments
    @current_comments = Comment.current_comments
  end

  private
  def comments_params
    params.require(:comment).permit(:text, :trip_id, :user_id)
  end


end
