app.views.Calculator = Backbone.View.extend({
  render: function(){
    $(this.el).html(app.templates.get('#calculator'));
    $(this.el).hide();
  },

  onShow: function(){
    $(this.el).fadeIn(700);
  }
});