ShoppingList.Views.ListShow = Backbone.CompositeView.extend({
  template: JST["list_show"],

  initialize: function(){
    this.itemSelector = "div.all-items";
    this.newItemSelector = "div.new-item";
    this.listenTo(this.collection, "add", this.addView);

    var newItemView = new ShoppingList.Views.NewItem({
      list: this.model
    });
    this.addSubview(this.newItemSelector, newItemView);

    this.collection.each(function(item){
      this.addView(item);
    }.bind(this));
  },

  addView: function(item){
    var itemView = new ShoppingList.Views.Item({
      model: item
    })

    this.addSubview(this.itemSelector, itemView);
  },

  render: function(){
    var renderedContent = this.template();

    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
})
