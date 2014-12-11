ShoppingList.Views.NewList = Backbone.CompositeView.extend({
  template: JST["new_list"],

  events: {
    "click .create-list": "createList",
    "keyup input.list-title": "updateListParams"
  },

  initialize: function(options){

  },

  updateListParams: function(event){
    var text = $(event.currentTarget).val();
    this._listParams = this._listParams || { "list": {} };
    this._listParams["list"].title = text;
  },

  createList: function(event){
    event.preventDefault();
    var $input = this.$("input.list-title");
    this.model = new ShoppingList.Models.List();
    this.model.set(this._listParams);
    this.model.save({},{
      success: function(){
        ShoppingList.lists.add(this.model);
        $input.val("");
      }.bind(this)
    });

  },

  render: function(){
    var renderedContent = this.template({
      list: this.model
    });

    this.$el.html(renderedContent);
    return this;
  }
})
