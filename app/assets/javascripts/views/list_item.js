ShoppingList.Views.ListItem = Backbone.CompositeView.extend({
  template: JST["list_item"],

  tagName: "li",

  render: function(){
    var renderedContent = this.template({
      list: this.model
    });

    this.$el.html(renderedContent);



    return this;
  }
})
