app.models.Calculator = Backbone.Model.extend({
	
	currentNumber: '',
	previousNumber: '',
	elementsStack: [],

	initialize: function() {
	    this.currentNumber = '';
	    this.previousNumber = '';
	    this.elementsStack = [];
	},


	process: function(input) {
		var numbers = ['0','1','2','3','4','5','6','7','8','9'];
		var operations = ['+', '-'];
		if(numbers.indexOf(input) != -1) {
			this.processNumber(input);
		}
		if(operations.indexOf(input) != -1) {
			this.processOperation(input);
			var toStore = this.currentNumber;
			this.currentNumber = '';
			return toStore;
		}
	},

	processNumber: function(input) {
		this.currentNumber += input;
	},

	processOperation: function(input) {
		if(this.currentNumber != '') {
			this.elementsStack.push({'number':parseFloat(this.currentNumber), operation: input});
		}
	},

	calculateResult: function() {
		var result = 0;
		var operation = '';
		var value = '';
		for(var i = 0; i < this.elementsStack.length; i++) {
			var currentValue = this.elementsStack[i].number;
			var nextOperation = this.elementsStack[i].operation;
			
			if(i == 0) {
				result = currentValue; 
			}

			result = this.performOperation(result, currentValue, operation);
			value = currentValue;
			operation = nextOperation;
		}
			console.log(operation);
		if(this.currentNumber != '') {
			result = this.performOperation(result, parseFloat(this.currentNumber), operation);
			if(operation == '') {
				result += parseFloat(this.currentNumber);
			}
		}

		return result;
	},

	performOperation: function(a, b, operation) {
		if(b != '' && operation != '') {
			if(operation == '+') {
				a += b;
			}
			if(operation == '-') {
				a -= b;
			}
		}
		return a;
	}

});