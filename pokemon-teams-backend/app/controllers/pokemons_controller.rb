class PokemonsController < ApplicationController
  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: pokemon_params[:trainer_id])
    head :no_content
  end
  
  def index
    if params[:trainer_id]
      pokemons = Pokemon.where(trainer_id: params[:trainer_id])
    else
      pokemons = Pokemon.all
    end
    render json: pokemons
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
    head :no_content
  end

  def pokemon_params
    params.require(:pokemon).permit(:trainer_id)
  end
end

