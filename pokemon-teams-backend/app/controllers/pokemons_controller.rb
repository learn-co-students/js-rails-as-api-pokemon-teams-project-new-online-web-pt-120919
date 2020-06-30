class PokemonsController < ApplicationController
    def create
        nickname = Faker::Name.first_name 
        species = Faker::Games::Pokemon.name 
        # trainer_id = params[:trainer_id]
        # if trainer.pokemons.size < 6
            # pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer_id)
        # end
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

    # def index
    #     pokemons = Pokemon.all 
    #     render json: pokemons 
    # end
end
