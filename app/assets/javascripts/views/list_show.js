ShoppingList.Views.ListShow = Backbone.CompositeView.extend({
  template: JST["list_show"],

  events: {
    "keyup input.phone-number": "updatePhoneNumber",
    "click button.send-text": "sendText"
  },

  initialize: function(){
    this.itemSelector = "div.all-items";
    this.newItemSelector = "div.new-item";
    this.toSendPhoneNumber = null;
    this._listOfItems = this._listOfItems || {};
    this.listenTo(this.collection, "add", this.addView);
    this.listenTo(this.model, "sync", this.listSyncActions);

    var newItemView = new ShoppingList.Views.NewItem({
      list: this.model
    });
    this.addSubview(this.newItemSelector, newItemView);

    this.collection.each(function(item){
      this.addView(item);
    }.bind(this));
  },

  addView: function(item){
    this.addItemToListParams(item);
    var itemView = new ShoppingList.Views.Item({
      model: item
    })

    this.addSubview(this.itemSelector, itemView);
  },

  sendText: function(event){
    var $button = this.$("button.send-text");
    var checkString = "<i class=\"fa fa-check\"></i><span>Sent</span>";
    var spinnerString = "<i class=\"fa fa-spinner fa-spin\"></i>";
    var errorString = "<i class=\"fa fa-times\"></i><span>Check Number</span>";
    $button.html(spinnerString);
    var data = {};
    data["phone"] = this.toSendPhoneNumber;
    data["items"] = this._listOfItems;

    $.ajax({
      url: "/api/texts",
      type: "POST",
      dataType: "json",
      data: data,
      success: function(){
        $button.html(checkString);
        this.$("button.send-text").addClass("dont-enable");
        this.$("button.send-text").attr("disabled", "disabled");
        this.model.set({
          "sent": true,
        });
        this.model.save({},{
          success: function(){
            ShoppingList.lists.remove(this.model);

            var filterText = $("input.lists-search").val();
            ShoppingList.filteredLists.setList(ShoppingList.lists, filterText);
          }.bind(this)
        })
      }.bind(this),

      error: function(){
        this.$("button.send-text").html(errorString);
      }.bind(this)
    })
  },

  updatePhoneNumber: function(event){
    if (event.keyCode === 13){
      this.sendText(event);
    } else {
      var number = $(event.currentTarget).val() === "" ? 0 :parseInt($(event.currentTarget).val());
      this.toSendPhoneNumber = number;
    }
  },

  listSyncActions: function(){
    this.activateSendText();
    this.updateListItems();
  },

  updateListItems: function(){
    var items = this.model.items();
    items.each(function(item){
      this.addItemToListParams(item);
    }.bind(this));
  },

  addItemToListParams: function(item){
    this._listOfItems[item.get("name")] = this._listOfItems[item.get("name")] ? this._listOfItems[item.get("name")] + parseInt(item.get("quantity")) : item.get("quantity");
  },


  activateSendText: function(){
    if (this.$("button.send-text").hasClass("dont-enable")){
      return;
    }
    this.$("button.send-text").removeAttr("disabled", "disabled");
  },

  render: function(){
    var renderedContent = this.template({
      list: this.model
    });

    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
})
