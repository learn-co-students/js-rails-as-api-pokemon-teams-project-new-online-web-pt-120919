class TrainersController < ApplicationController
  def index 
    trainers = Trainer.all 
    options = {
      include: [:pokemons], fields: { pokemons: [:species, :nickname] }
    }
    render json: TrainerSerializer.new(trainers, options)
  end
end
