class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
      end

    def show
        pokemon = Pokemon.find(params[:id])
        render json: PokemonSerializer.new(pokemon)
    end

    def create
        nickname = Faker::Name.first_name 
        species = Faker::Games::Pokemon.name 
        trainer = Trainer.find(params[:trainer_id])
        
        pokemon = trainer.pokemons.build({
            nickname: nickname, species: species
        })
        if pokemon.save
            render json: pokemon
        else
            render json: {message: pokemon.errors.messages[:team_max][0]}
        end
    end

    def destroy 
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy 
    end
    
end