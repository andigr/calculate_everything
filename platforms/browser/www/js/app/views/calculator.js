app.views.Calculator = Backbone.View.extend({
  initialize: function() {
    this.model = new app.models.Calculator({view: this});
    this.template = app.templates.get('#calculator').clone();
    this.el = $(this.el);
  },

  render: function(){
    this.el.html(this.template.html());
    var newHolder = this.createNewHolder('');
    this.active = newHolder;
    this.bindEvents();
    this.el.hide();
  },

  onShow: function(){
    this.el.fadeIn(700);
  },

  bindEvents: function() {
    this.el.find('button').click(_.bind(this.buttonClicked, this));
  },

  buttonClicked: function(e) {
    var clicked = $(e.target);
    var value = clicked.html();

    var storeValue = this.model.process(value);
    if(storeValue) {
      var newHolder = this.createNewHolder();
      this.active = newHolder;
    }
    this.updateCurrentSection(this.model.currentNumber);
  },

  updateCurrentSection: function(value) {
    this.active.find('input').val(value);
  },

  createNewHolder: function(value, operation) {
    var valueHolderHtml = app.templates.get('#value-holder').clone().html();
    var template = _.template(valueHolderHtml);
    var compiled = $(template({value: value, operation: operation}));
    var newHolder = this.el.find('.value-container').append(compiled);
    window.scrollTo(0,document.body.scrollHeight);
    return compiled;
  }

});

