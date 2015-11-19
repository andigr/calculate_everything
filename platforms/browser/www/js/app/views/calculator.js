app.views.Calculator = Backbone.View.extend({
  initialize: function() {
    this.model = new app.models.Calculator({view: this});
    this.template = app.templates.get('#calculator').clone();
    this.el = $(this.el);
  },

  render: function(){
    this.el.html(this.template.html());
    var buttons = [
      [
        {k: '7', v:'7'},
        {k: '8', v:'8'},
        {k: '9', v:'9'},
        {k: '+', v:'+'}
      ],
      [
        {k: '4', v:'4'},
        {k: '5', v:'5'},
        {k: '6', v:'6'},
        {k: '-', v:'-'},
      ],
      [
        {k: '1', v:'1'},
        {k: '2', v:'2'},
        {k: '3', v:'3'},
        {k: '0', v:'0'}
      ],
      [
        {k: 'back', v:'back'},
        {k: 'clear', v:'clear'},
        {k: 'x', v:'x'},
        {K: '/', v:'/'}
      ]
    ];
    var buttonBuilder = new app.views.ButtonBuilder({el: this.el.find('.buttons-container'), buttons: buttons});
    buttonBuilder.render();
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

  reset: function() {
    this.el.find('.value-container').empty();
    this.model.reset();
    var newHolder = this.createNewHolder('');
    this.active = newHolder;
    this.update();
  }

});

