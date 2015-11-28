app.views.Base = Backbone.View.extend({

  onShow: function(){
    this.el.fadeIn(700);
  },

  bindEvents: function() {
    this.el.find('button').click(_.bind(this.buttonClicked, this));
  },

  buttonClicked: function(e) {
    var clicked = $(e.target);
    var value = clicked.data('value').toString();
    if(value == 'clear') {
      this.reset();
      return;
    }

    var storeValue = this.model.process(value);
    if(storeValue) {
      var newHolder = this.createNewHolder();
      this.active = newHolder;
      $('.result-container').show();
    }
    this.update();
  },

  update: function() {
    this.updateCurrentSection();
    this.updateResult();
  },

  updateCurrentSection: function() {
    this.active.find('input').val(this.model.currentNumber);
  },

  updateResult: function() {
    $('.result-container input').val(this.model.calculateResult());
  },

  createNewHolder: function(value, operation) {
    var valueHolderHtml = app.templates.get('#value-holder').clone().html();
    var template = _.template(valueHolderHtml);
    var compiled = $(template({value: value, operation: operation}));
    var newHolder = this.el.find('.value-container').append(compiled);
    window.scrollTo(0,document.body.scrollHeight);
    return compiled;
  },

});