ShoppingList.Views.Main = Backbone.CompositeView.extend({
  template: JST["main"],

  events: {
    "click .list-item": "showItems",
    "click #mini-sidebar-menu #plus-open": "openSidebar"
  },

  initialize: function(){
    this.listsSelector = "div#sidebar ul.lists";
    this.itemsSelector = "div.items";
    this.newListSelector = "div#sidebar div.new-list";
    this.listsHeaderSelector = "div#sidebar div.lists-header";

    var listsHeaderView = new ShoppingList.Views.ListsHeader();
    this.addSubview(this.listsHeaderSelector, listsHeaderView);

    var newListView = new ShoppingList.Views.NewList();
    this.addSubview(this.newListSelector, newListView);

    this.listenTo(this.collection, "add", this.addView);
    this.listenTo(this.collection, "remove", this.removeView);

    //custom listen event on new list addition
    this.listenTo(this.collection, "newlistevent", this.showNewList)

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
      if (!view.model || view.model.id === list.id){
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
      // $("div.container.all-items-container").on("click", function(){
      //   $.sidr("close", "sidebar", function(){
      //   }.bind(this));
      //   $miniSideBar.css({"display": "block"});
      //   setTimeout(function(){ $miniSideBar.css({"width": "70px"}); }, 0 )
      //
      //   this.$("div.all-items-container").css({"left": "70px"})
      // }.bind(this));
    });
    this.$("#mini-sidebar-menu").css({"width": "0px", "display":"none"});
    this.$("div.all-items-container").css({"left": "0"})

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

  showNewList: function(newList){
    this._subviews[this.itemsSelector] = [];
    this.$(this.itemsSelector).empty();

    var listId = newList.id;
    var list = this.collection.get(listId);
    if (list){
      var showView = new ShoppingList.Views.ListShow({
        collection: list.items(),
        model: list
      });
      list.fetch();

      this.addSubview(this.itemsSelector, showView);
    } else {
      return;
    }

  },

  render: function(){
    var renderedContent = this.template({
      lists: this.collection
    });

    this.$el.html(renderedContent);
    this.attachSubviews();

    setTimeout(function(){
      this.$("#mini-sidebar-menu-hidden").sidr({
        name: "sidebar",
        side: "left",
      })
      this.$el.append($("#sidebar"));
      this.$("#sidebar").append("<div class=\"lists-header\"></div>");
      this.$("#sidebar").append("<ul class=\"lists\"></ul>");
      this.$("#sidebar").append("<div class=\"new-list\"></div>");
      this.attachSubviews();
    }.bind(this), 0)
    return this;
  }
})
