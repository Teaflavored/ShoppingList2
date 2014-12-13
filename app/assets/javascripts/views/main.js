ShoppingList.Views.Main = Backbone.CompositeView.extend({
  template: JST["main"],

  events: {
    "click .list-item": "showItems",
    "mouseover #mini-sidebar-menu #plus-open": "openSidebar"
  },

  initialize: function(){
    this.listsSelector = "div#sidebar";
    this.itemsSelector = "div.items";
    this.newListSelector = "div#sidebar";

    var newListView = new ShoppingList.Views.NewList();
    this.addSubview(this.newListSelector, newListView);

    this.listenTo(this.collection, "add", this.addView);
    this.listenTo(this.collection, "remove", this.removeView);

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

  removeView: function(list){
    var viewsToDelete = [];
    _.each(this.subviews(this.listsSelector), function(view){
      if (view.model.id === list.id){
        viewsToDelete.push(view);
      }
    }.bind(this));
    _.each(viewsToDelete, function(view){
      this.removeSubview(this.newListSelector, view);
    }.bind(this));
  },

  openSidebar: function(){
    var $miniSideBar = this.$("#mini-sidebar-menu");
    $.sidr("open", "sidebar", function(){
      $("div#sidebar").on("mouseleave", function(){
        $.sidr("close", "sidebar", function(){
          $miniSideBar.css({"width": "70px", "display": "block"});
        });
      })

    });
    this.$("#mini-sidebar-menu").css({"width": "0px", "display":"none"});

  },

  showItems: function(event){
    event.preventDefault();
    //clear old subviews
    this._subviews[this.itemsSelector] = [];
    this.$(this.itemsSelector).empty();


    var listId = $(event.currentTarget).data("id");
    var list = this.collection.get(listId);
    var showView = new ShoppingList.Views.ListShow({
      collection: list.items(),
      model: list
    });
    list.fetch();

    this.addSubview(this.itemsSelector, showView);
  },

  render: function(){
    var renderedContent = this.template({
      lists: this.collection
    });

    this.$el.html(renderedContent);
    this.attachSubviews();

    setTimeout(function(){
      this.$("#mini-sidebar-menu").sidr({
        name: "sidebar",
        side: "left",
      })
      this.$el.append($("#sidebar"));
      this.attachSubviews();
    }.bind(this), 0)
    return this;
  }
})
