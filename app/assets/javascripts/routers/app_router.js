ShoppingList.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "main"
  },

  initialize: function(options){
    this.$rootEl = options.$rootEl;
    //fetching all the lists
    ShoppingList.lists.fetch();
  },

  main: function(){
    var mainView = new ShoppingList.Views.Main({
      collection: ShoppingList.lists
    });

    this._swapView(mainView);
  },

  _swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el);
  }

})
