ShoppingList.Views.Item = Backbone.CompositeView.extend({
  template: JST["single_item"],

  className: "single-item",

  events: {
    "click button.remove-item": "removeItem"
  },

  removeItem: function(event){
    var $button = $(event.currentTarget);
    var listId = $button.data("list-id");
    var list = ShoppingList.lists.get(listId);
    this.model.destroy({
      success: function(){
        list.items().remove(this.model);
      }.bind(this)
    })
  },

  initialize: function(){
    this.listenTo(this.model, "change:quantity", this.render);
  },

  render: function(){
    var renderedContent = this.template({
      item: this.model
    });

    this.$el.html(renderedContent);
    return this;
  }
})
