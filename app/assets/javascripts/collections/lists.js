ShoppingList.Collections.Lists = Backbone.Collection.extend({
  url: "api/lists",
  model: ShoppingList.Models.List,

  comparator: function(list){
    return (new Date(list.get("created_at"))).valueOf();
  },

  setList: function(lists, text){
    lists.sort();
    var model;
    var modelIds = this.pluck("id");
    _.each(modelIds, function(modelId){
      if (model = this.get(modelId)){
        this.remove(model);
      }
    }.bind(this));

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
