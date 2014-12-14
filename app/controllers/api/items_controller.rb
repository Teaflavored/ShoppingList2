class Api::ItemsController < ApplicationController
  def index
    @items = Item.all
    render :index
  end

  def create
    @item = Item.new(item_params)
    if @item.save
      render :show
    else
      render json: @item.errors.full_messages, status: 422
    end
  end

  def update
    @item = Item.find(params[:id])
    if @item.update(item_params)
      render :show
    else
      render json: @item.errors.full_messages, status: 422
    end
  end
  private

  def item_params
    params.require(:item).permit(:name, :quantity, :list_id)
  end
end
