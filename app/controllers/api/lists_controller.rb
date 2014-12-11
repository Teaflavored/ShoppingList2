class Api::ListsController < ApplicationController
  def index

  end

  def create

  end

  def show

  end

  private

  def list_params
    params.require(:list).permit(:title)
  end
end
