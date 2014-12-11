ShoppingList.Views.NewItem = Backbone.CompositeView.extend({
  template: JST["new_item"],

  events: {
    "click .create-item": "createItem",
    "keyup input.item-name": "updateItemName",
    "change input.item-quant": "updateItemQuant"
  },

  initialize: function(options){
    this.list = options.list;
    this.listenTo(this.list, "sync", this.updateListId);
    this._itemParams = {
      "item": {
        "list_id": this.list.id
      }
    }
  },

  updateListId: function(){
    this._itemParams["item"].list_id = this.list.id;
  },

  updateItemName: function(event){
    var text = $(event.currentTarget).val();
    this._itemParams["item"].name = text;
  },

  updateItemQuant: function(event){
    var num = parseInt($(event.currentTarget).val());
    this._itemParams["item"].quantity = num;
  },

  createItem: function(event){
    event.preventDefault();
    var $input = this.$("input.item-name");
    debugger
    this.model = new ShoppingList.Models.Item();
    this.model.set(this._itemParams);
    this.model.save({},{
      success: function(){
        this.list.items().add(this.model);
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
