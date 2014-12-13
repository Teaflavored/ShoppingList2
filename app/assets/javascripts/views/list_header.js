ShoppingList.Views.ListsHeader = Backbone.CompositeView.extend({
  template: JST["lists_header"],

  events: {
    "keyup input.lists-search": "filterLists"
  },

  filterLists: function(event){
    var $input = $(event.currentTarget);
    var text = $input.val();
    if (text === ""){
      ShoppingList.filteredLists.set(ShoppingList.lists.models);
    } else {
      ShoppingList.filteredLists.setList(ShoppingList.lists, text);
    }
  },

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  }
})
