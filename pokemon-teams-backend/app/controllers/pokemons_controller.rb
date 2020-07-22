class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all 
        render json: PokemonSerializer.new(pokemons)
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: PokemonSerializer.new(pokemon)
    end 

    def create
        trainer = Trainer.find(params["pokemon"]["trainer_id"])
        if trainer.pokemons.count >= 6
            render json: {error: "Full party"}
        else 
            pokemon = trainer.pokemons.build(nickname: Faker::Games::Pokemon.name)
            if pokemon.save
                render json: PokemonSerializer.new(pokemon)
            else 
                render json: {error: "Failed"}
            end
        end 
        # pokemon = Pokemon.new(pokemon_params)
        # if pokemon.save
        #     byebug
        #     render json: PokemonSerializer.new(pokemon)
        # end 
    end 

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
        render json: pokemon
    end 

    private

    def pokemon_params
        params.require(:pokemon).permit(:nickname, :species, :trainer_id)
    end 
end
