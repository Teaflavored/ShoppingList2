ShoppingList.Views.NewList = Backbone.CompositeView.extend({
  template: JST["new_list"],

  events: {
    "click button.create-list": "openUpField",
    "keyup input.list-title": "updateListParams"
  },

  initialize: function(options){
    this._listParams = this._listParams || { "list": {} };
  },

  updateListParams: function(event){
    if (event.keyCode === 13){
      this.createList();
    } else {
      var text = $(event.currentTarget).val();
      this._listParams["list"].title = text;
    }
  },

  openUpField: function(event){
    event.preventDefault();
    //make an input appear

    if (!this.$("div.title-holder input").hasClass("closed")){
      this.$("div.title-holder").css({
        "height": "0px"
      });

      this.$("div.title-holder").one("transitionend", function(){
        this.$("div.title-holder").addClass("closed");
        this.$("div.title-holder input").addClass("closed")
      }.bind(this));
    } else {
      this.$("div.title-holder").css({
        "height": "30px"
      });

      this.$("div.title-holder").one("transitionend", function(){
        this.$("div.title-holder").removeClass("closed");
        this.$("div.title-holder input").removeClass("closed");
      }.bind(this));

    }
  },

  createList: function(event){

    var $input = this.$("input.list-title");
    this.model = new ShoppingList.Models.List();
    this.model.set(this._listParams);
    this.disableInputFields();
    this.model.save({},{
      success: function(){

        this.enableInputFields();
        this.clearInternalParams();
        ShoppingList.lists.add(this.model);
        //trigger and show the new list

        //see if we want to add it to the filteredLists
        var filterText = $("input.lists-search").val();

        ShoppingList.filteredLists.setList(ShoppingList.lists, filterText);


        ShoppingList.filteredLists.trigger("newlistevent", this.model);
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
