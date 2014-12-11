Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :lists, only: [:index, :create, :show]
    resources :items, only: [:index, :create]
  end
end
