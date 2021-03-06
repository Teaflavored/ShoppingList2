class Api::ListsController < ApplicationController
  def index
    @lists = List.all_not_sent.includes(:items)
    render :index
  end

  def create
    @list = List.new(list_params)
    if @list.save
      render :show
    else
      render json: @list.errors.full_messages, status: 422
    end
  end

  def update
    @list = List.find(params[:id])
    if @list.update(update_list_params)
      render :show
    else
      render json: @list.errors.full_messages, status: 422
    end
  end

  def show
    @list = List.find(params[:id])
    @list_items = @list.items
    render :show
  end

  def destroy
    @list = List.find(params[:id])
    @list.destroy!
    render :show
  end

  private

  def list_params
    params.require(:list).permit(:title, :sent)
  end

  def update_list_params
    params.require(:list).permit(:sent)
  end
end
