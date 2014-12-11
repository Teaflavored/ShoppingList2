ShoppingList.Collections.Lists = Backbone.Collection.extend({
  url: "api/lists",
  model: ShoppingList.Models.List
})

ShoppingList.lists = new ShoppingList.Collections.Lists();
