class Api::ItemsController < ApplicationController
  def index

  end

  def create
  end

  private

  def item_params
    params.require(:item).permit(:name, :quantity, :list_id)
  end
end
