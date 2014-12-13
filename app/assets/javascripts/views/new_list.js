ShoppingList.Views.NewList = Backbone.CompositeView.extend({
  template: JST["new_list"],

  events: {
    "click button.create-list": "createList",
    "keyup input.list-title": "updateListParams"
  },

  initialize: function(options){
    this._listParams = this._listParams || { "list": {} };
  },

  updateListParams: function(event){
    if (event.keyCode === 13){
      this.createList(event);
    } else {
      var text = $(event.currentTarget).val();
      this._listParams["list"].title = text;
    }
  },

  createList: function(event){
    event.preventDefault();
    var $input = this.$("input.list-title");
    this.model = new ShoppingList.Models.List();
    this.model.set(this._listParams);
    this.disableInputFields();
    this.model.save({},{
      success: function(){
        this.enableInputFields();
        this.clearInternalParams();
        ShoppingList.lists.add(this.model);
        $input.val("");
      }.bind(this),

      error: function(){
        //error handling, popup or something;
        this.enableInputFields();
        this.clearInternalParams();
      }.bind(this)
    });

  },

  clearInternalParams: function(){
    this._listParams["list"].title = "";
  },

  disableInputFields: function(){
    this.$("input.list-title").attr("disabled", "disabled");
    this.$("button.create-list").attr("disabled", "disabled");
  },

  enableInputFields: function(){
    this.$("input.list-title").removeAttr("disabled", "disabled");
    this.$("button.create-list").removeAttr("disabled", "disabled");
  },

  render: function(){
    var renderedContent = this.template({
      list: this.model
    });

    this.$el.html(renderedContent);
    return this;
  }
})
