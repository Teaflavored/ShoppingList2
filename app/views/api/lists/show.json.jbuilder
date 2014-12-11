json.extract!(@list, :id, :title)
json.items do
  json.array!(@list_items) do |item|
    json.extract!(item, :id, :name, :quantity, :list_id)
  end
end
