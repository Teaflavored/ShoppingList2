json.array!(@lists) do |list|
  json.extract!(list, :id, :title, :sent, :created_at)

  json.items do
    json.array!(list.items) do |item|
      json.extract!(item, :id, :name, :quantity, :list_id)
    end
  end
end
