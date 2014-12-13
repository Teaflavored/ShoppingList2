Rails.application.routes.draw do
  root to: "static_pages#home"
  namespace :api, defaults: { format: :json } do
    resources :lists, only: [:index, :create, :show]
    post "/texts", to: "texts#send_text"
    resources :items, only: [:index, :create, :update]
  end
end
