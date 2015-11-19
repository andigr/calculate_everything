app.views.ButtonBuilder = Backbone.View.extend({

	initialize: function(data) {
		this.buttonsData = data.buttons;
		this.buttonHtml = app.templates.get('#button-html').html();
		this.row = app.templates.get('#row');
		window.trow = this.row;
	},

	render: function() {
		for(var i in this.buttonsData) {
			var row = $(this.row.clone().html());
			$(this.el).append(row);
			for(var j in this.buttonsData[i]) {
				var template = _.template(this.buttonHtml);
				var buttonData = this.buttonsData[i][j];
				var compiled = template({value: buttonData.k, 'label': buttonData.v});
				$(row).append(compiled);
			}
		}
	}

});