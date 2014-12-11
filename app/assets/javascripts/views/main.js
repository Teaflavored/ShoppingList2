ShoppingList.Views.Main = Backbone.View.extend({
  template: JST["main"],

  render: function(){
    var renderedContent = this.template();

    this.$el.html(renderedContent);
    return this;
  }
})
