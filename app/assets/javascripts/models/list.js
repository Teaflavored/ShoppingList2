ShoppingList.Models.List = Backbone.Model.extend({
  urlRoot: "api/lists",

  items: function(){
    this._items = this._items || new ShoppingList.Collections.Items();
  }
  parse: function(jsonResp){
    this.items.set(jsonResp.items);
    
    delete jsonResp.items;
    return jsonResp;
  }
})
