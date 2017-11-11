class UsersController < ApplicationController
  before_action :must_log_in, only: [:index, :show]
  before_action :set_user, only: [:edit, :update]
  before_action :authorize_user, only: [:edit, :update]

  def index
    @users = User.all
    @planners = User.planners
    @goers = User.goers
    @romantics = User.romantics
    @honeymooners = User.honeymooners
    @connoisseurs = User.connoisseurs
    @luckystars = User.luckystars
    @roadtrippers = User.roadtrippers
    respond_to do |f|
      f.html {render :index}
      f.json{render json: @users}
    end
  end

  def types
    @romantics = User.romantics
    @adventurous = User.adventurous
    @intellectuals = User.intellectuals
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      flash[:notice] = "#{@user.name.capitalize} was successfully registered."
      redirect_to user_path(@user)
    else
      flash[:notice] = "Something went wrong."
      redirect_to new_user_path
    end
  end

  def show
    @user = User.find_by(id: params[:id])
    respond_to do |f|
     f.html {render :show}
     f.json{render json: @user}
   end
  end

  def trips
    @user = User.find(params[:id])
    @trips = @user.trips
    respond_to do |f|
      f.html {render :index}
      f.json{render json: @trips}
    end
  end

  def edit
  end

  def update
  	 @user.update(user_params)
     if @user.save
       flash[:notice] = "#{@user.name.capitalize} was updated."
		   redirect_to user_path(@user)
     else
       flash[:notice] = "Access Denied."
       redirect_to users_path
     end
	end

  private

  def user_params
    params.require(:user).permit(:id, :name, :email, :password, :password_confirmation, :personality, :reason, :international, :companion, :budget, :role)
  end

  def set_user
    @user = User.find(params[:id])
  end

  def authorize_user
    return head(:forbidden) unless @user.id == current_user.id || current_user.is_admin?
  end

end
