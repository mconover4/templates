Rails.application.routes.draw do

  get '/auth/facebook/callback' => 'sessions#create'

  root 'home#index'
  get 'home/contact'
  get 'home/main'
  get 'home/sample'
  get 'users/types'
  get '/trips/:id/categories', to: 'trips#categories'
  get '/users/:id/trips', to: 'users#trips'
  delete 'logout' => 'sessions#destroy'
  resources :trips
  resources :users
  resources :sessions

  resources :users, only: [:index, :show] do
    resources :trips, only: [:new, :edit, :show]
  end

  resources :trips, except: [:destroy] do
    resources :categories
  end

  resources :categories
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
