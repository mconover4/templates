Rails.application.routes.draw do
  root 'home#index'
  resources :goers
  resources :planners
  resources :trips

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
