json.products @products do |product|
  json.(product, :id, :name, :description, :price, :quantity)
end
