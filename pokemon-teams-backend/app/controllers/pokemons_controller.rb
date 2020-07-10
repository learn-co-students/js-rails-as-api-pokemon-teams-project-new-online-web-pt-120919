class PokemonsController < ApplicationController
    def index
        all_pokemon = Pokemon.all
        render json: all_pokemon
    end 

    def create
        pokemon = Pokemon.create(
            nickname: Faker::Name.name,
            species: Faker::Games::Pokemon.name,
            trainer: Trainer.find(params[:trainer_id])
        )

        render json: pokemon
    end 

    def destroy
        pokemon = Pokemon.find(params[:pokemon_id])
        pokemon.destroy
        render json: pokemon
    end 
end
