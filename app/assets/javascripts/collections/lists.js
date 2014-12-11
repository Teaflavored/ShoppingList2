ShoppingList.Collections.Lists = Backbone.Collection.extend({
  url: "api/lists",
  model: ShoppingList.Models.List
})
