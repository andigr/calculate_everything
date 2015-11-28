app.views.Calculator = app.views.Base.extend({
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
        {k: '*', v:'x'},
        {k: 'divide', v:'/'}
      ]
    ];
    var buttonBuilder = new app.views.ButtonBuilder({el: this.el.find('.buttons-container'), buttons: buttons});
    buttonBuilder.render();
    var newHolder = this.createNewHolder('');
    this.active = newHolder;
    this.bindEvents();
    this.el.hide();
  },

  reset: function() {
    this.el.find('.value-container').empty();
    this.model.reset();
    var newHolder = this.createNewHolder('');
    this.active = newHolder;
    this.update();
  }

});

