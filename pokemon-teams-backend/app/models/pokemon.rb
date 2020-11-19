class Pokemon < ApplicationRecord
  belongs_to :trainer
  validate do 
    pokemon_count_valid?
  end

  private

  def pokemon_count_valid?
    if self.trainer.pokemons.count >= 6 
      # put >= instead of >7 might fall through the cracks
      self.errors.add(:team_max, "Max number of pokemon reached.")
      # :team_max is the key for the error value is "Max number of pokemon reached."
    end
  end
end
