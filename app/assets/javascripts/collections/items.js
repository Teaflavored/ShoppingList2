ShoppingList.Collections.Items = Backbone.Collection.extend({
  url: "api/items",
  model: ShoppingList.Models.Item
})
