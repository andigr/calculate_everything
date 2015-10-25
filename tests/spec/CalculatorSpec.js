describe('calculator', function() {

	var calculator;

	beforeEach(function() {
		calculator = new app.models.Calculator();
	});

	it('should correctly perform sum operation', function() {
		expect(calculator.performOperation(11,12,'+')).toBe(23);
	});

	it("should have result after single input", function() {
	    calculator.process('2');
	    expect(calculator.calculateResult()).toBe(2);
	});

	it("should correctly calculate sum with operation at the end", function() {
	    calculator.process('2');
	    calculator.process('1');
	    calculator.process('+');
	    calculator.process('5');
	    calculator.process('0');
	    calculator.process('+');
	    expect(calculator.calculateResult()).toBe(71);
	});

	it("should correctly calculate sum without operation at the end", function() {
	    calculator.process('2');
	    calculator.process('1');
	    calculator.process('+');
	    calculator.process('5');
	    calculator.process('0');
	    expect(calculator.calculateResult()).toBe(71);
	});

});