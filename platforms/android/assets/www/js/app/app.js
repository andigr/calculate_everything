app.Region = (function (Backbone, $) {
    var currentView;
    var el = "#app";
    var region = {};

    var closeView = function (view) {
        $(el).empty();
    };

    var openView = function (view) {
        view.render();
        if (view.onShow) {
            view.onShow();
        }
    };

    region.show = function (View) {
        var view = new View({el: '#app'})
        closeView(currentView);
        currentView = view;
        openView(currentView);
    };

    return region;
})(Backbone, jQuery);

(function($, app){
    
  var AppRouter = function() {
    app.Region.show(app.views.Calculator);
    var _this = this;

    function init() {
      $('.side-menu a').click(function(e) {
        console.log('clicked2');
        var clicked = $(e.currentTarget);
        var anchor = clicked.attr('href');
        var method = anchor.replace('#', '').replace(' ', '');

        if(_this.hasOwnProperty(method)) {
          _this[method]();          
        }

      });

    }

    this.calculator = function() {
      app.Region.show(app.views.Calculator);
    }

    init();

  }

  $(document).ready(function() {
    $.get( "templates/main.html", function( data ) {
        app.templates = {
            data: $(data),
            get: function(template) {
                return this.data.filter(template).html();
            }
        }
        new AppRouter();
    });
  });

})(jQuery, app);