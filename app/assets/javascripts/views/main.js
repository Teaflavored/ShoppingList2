ShoppingList.Views.Main = Backbone.CompositeView.extend({
  template: JST["main"],

  initialize: function(){
    this.listsSelector = "div.lists";
    this.listenTo(this.collection, "add", this.addView);

    this.collection.each(function(list){
      this.addView(list);
    }.bind(this));
  },

  addView: function(list){
    var listItemView = new ShoppingList.Views.ListItem({
      model: list
    });

    this.addSubview(this.listsSelector, listItemView);
  },

  render: function(){
    var renderedContent = this.template({
      lists: this.collection
    });

    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
})
