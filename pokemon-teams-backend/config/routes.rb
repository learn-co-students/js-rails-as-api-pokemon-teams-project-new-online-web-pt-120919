Rails.application.routes.draw do
  resources :pokemons
  resources :trainers
  
  post '/pokemon', to: 'pokemons#create'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
