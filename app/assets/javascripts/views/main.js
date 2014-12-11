ShoppingList.Views.Main = Backbone.CompositeView.extend({
  template: JST["main"],

  events: {
    "click .list-item": "showItems"
  },

  initialize: function(){
    this.listsSelector = "div.lists";
    this.itemsSelector = "div.items";
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

  showItems: function(event){
    event.preventDefault();
    //clear old subviews
    this._subviews[this.itemsSelector] = [];
    this.$(this.itemsSelector).empty();


    var listId = $(event.currentTarget).data("id");
    var list = this.collection.get(listId);
    var showView = new ShoppingList.Views.ListShow({
      collection: list.items()
    });

    this.addSubview(this.itemsSelector, showView);
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
