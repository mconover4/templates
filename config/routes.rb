Rails.application.routes.draw do


  root 'home#index'
  get 'home/contact'
  get 'home/main'
  get 'home/sample'
  
end
