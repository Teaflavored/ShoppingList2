ShoppingList.Collections.Lists = Backbone.Collection.extend({
  url: "api/lists",
  model: ShoppingList.Models.List,

  setList: function(lists, text){
    var filteredLists = lists.filter(function(list){
      if (list.get("title").match(text.toLowerCase())){
        return true;
      } else {
        return false;
      }
    });

    this.set(filteredLists);
  }
})

ShoppingList.lists = new ShoppingList.Collections.Lists();
ShoppingList.filteredLists = new ShoppingList.Collections.Lists();
