ShoppingList.Views.Item = Backbone.CompositeView.extend({
  template: JST["single_item"],

  render: function(){
    var renderedContent = this.template({
      item: this.model
    });

    this.$el.html(renderedContent);
    return this;
  }
})
