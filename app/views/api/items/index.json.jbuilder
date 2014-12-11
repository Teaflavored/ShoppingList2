json.array!(@items) do |item|
  json.extract!(item, :id, :name, :quantity, :list_id)
end
