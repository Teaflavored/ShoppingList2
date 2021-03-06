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
        "list_id": this.list.id,
        "quantity": 1,
      }
    }
  },

  updateListId: function(){
    this._itemParams["item"].list_id = this.list.id;
  },

  updateItemName: function(event){
    if (event.keyCode === 13){
      this.createItem(event);
    } else {
      var text = $(event.currentTarget).val();
      this._itemParams["item"].name = text;
    }
  },

  updateItemQuant: function(event){
    var num = parseInt($(event.currentTarget).val());
    this._itemParams["item"].quantity = num;
  },

  createItem: function(event){
    //check if there's valid input
    event.preventDefault();
    var $input = this.$("input.item-name");
    var $button = this.$("button.create-item");

    if (!this._itemParams["item"].name || this._itemParams["item"].name.length === 0){
      //give error
      $input.attr("placeholder", "Can't be blank.")
      $input.css("border","1px red solid");
      return;
    }
    //add spinner and disable
    $button.html("<i class=\"fa fa-spinner fa-spin\"></i>");
    //disable button and fields
    this.disabledFields();

    this.model = this.list.items().findWhere({ name: this._itemParams["item"].name.toLowerCase() });
    if (this.model){

      var oldQuant = this.model.get("quantity")
      this.model.set({
        "item": {
          quantity: Math.floor(parseInt(this._itemParams["item"].quantity) + parseInt(oldQuant))
        }
      })
    } else {

      this.model = new ShoppingList.Models.Item();
      this.model.set(this._itemParams);
    }

    this.model.save({},{
      success: function(){
        this.reEnableFields();
        $button.html("Add");
        if (!this.list.items().get(this.model.id)){
          this.list.items().add(this.model);
        }
        $input.val("");
        this._itemParams["item"].name = null;
        this._itemParams["item"].quantity = 1;
        this.$("input.item-quant").val("1");
      }.bind(this)
    });

  },

  matcher: function(strs){
    return function findMatches(q, cb) {
      var matches, substrRegex;
      matches = [];
      substrRegex = new RegExp(q, 'i');
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push({ value: str });
        }
      });
      cb(matches);
    };

  },

  attachTypeahead: function(){
    //need to work on typeahead
    var items = new Bloodhound({
      datumTokenizer: function (datum) {
        return Bloodhound.tokenizers.whitespace(datum.value);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: 'http://www.supermarketapi.com/api.asmx/SearchByProductName?APIKEY=8e1280d3ae&ItemName=%QUERY',

        ajax: {
          dataType: "jsonp",
          success: function(data){
            ;
          }
        },

        filter: function (movies) {
          // Map the remote source JSON array to a JavaScript object array

          return $.map(movies.results, function (movie) {
            return {
              value: movie.original_title
            };
          });
        }
      }
    });

    items.initialize();

    // this.$("input.item-name").typeahead({
    //   highLight: true,
    //   minLength: 1
    // }, {
    //   displayKey: "value",
    //   source: items.ttAdapter()
    // })
    //
    // this.$("input.item-name").on("typeahead:selected", function(event, data){
    //   this._itemParams["item"].name = data.value;
    // }.bind(this))
  },

  disabledFields: function(){
    var $input = this.$("input.item-name");
    var $button = this.$("button.create-item");

    $input.attr("disabled", "disabled");
    $button.attr("disabled", "disabled");
  },

  reEnableFields: function(){
    var $input = this.$("input.item-name");
    var $button = this.$("button.create-item");

    $input.removeAttr("disabled", "disabled");
    $button.removeAttr("disabled", "disabled");
  },

  render: function(){
    var renderedContent = this.template({
      list: this.model
    });

    this.$el.html(renderedContent);

    setTimeout(function(){
      this.attachTypeahead();
      this.$("input.item-quant").val(1);
    }.bind(this), 0)
    return this;
  }
})
