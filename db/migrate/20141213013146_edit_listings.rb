class EditListings < ActiveRecord::Migration
  def change
    add_column :lists, :sent, :boolean, default: false
  end
end
