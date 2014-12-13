ShoppingList.Views.Item = Backbone.CompositeView.extend({
  template: JST["single_item"],

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
