window.ShoppingList = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(){
    new ShoppingList.Routers.AppRouter({
      $rootEl: $("div#main")
    });

    Backbone.history.start();
  }
}
