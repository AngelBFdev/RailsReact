Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :products do
        resources :comments, only: [:create]
      end

      resources :users, only: [:create]

      post '/signin', to: 'sessions#create'
      delete '/signout', to: 'sessions#destroy', as: 'session'
    end
  end
  root 'products#index'
end
