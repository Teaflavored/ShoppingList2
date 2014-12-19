ShoppingList.Views.Item = Backbone.CompositeView.extend({
  template: JST["single_item"],

  className: "single-item",

  events: {
    "click button.remove-item": "removeItem",
    "click": "toggleExpand"
  },

  removeItem: function(event){
    var $button = $(event.currentTarget);
    var listId = $button.data("list-id");
    var list = ShoppingList.lists.get(listId);
    this.model.destroy({
      success: function(){
        list.items().remove(this.model);
      }.bind(this)
    })
  },

  toggleExpand: function(){
    var $itemBox = this.$("div.single-item-wrapper");
    var $itemDesc = this.$("p.item-info-name-long");
    if ($itemBox.hasClass("long-item")){
      $itemBox.removeClass("long-item");
      $itemDesc.addClass("hidden-item");
    } else {
      $itemBox.addClass("long-item");
      $itemBox.one("transitionend", function(){
        $itemDesc.removeClass("hidden-item");
      });
      var siblings = this.$el.siblings();
      siblings.find("div.single-item-wrapper").removeClass("long-item");
    }
  },

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
