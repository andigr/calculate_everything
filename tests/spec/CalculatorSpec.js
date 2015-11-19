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

	it("minus operator should work correctly", function() {
	    calculator.process('7');
	    calculator.process('6');
	    calculator.process('-');
	    calculator.process('1');
	    calculator.process('5');
	    expect(calculator.calculateResult()).toBe(61);
	});

	it("multiply operator should work correctly", function() {
	    calculator.process('1');
	    calculator.process('2');
	    calculator.process('*');
	    calculator.process('3');
	    expect(calculator.calculateResult()).toBe(36);
	});

	it("divide operator should work correctly", function() {
	    calculator.process('5');
	    calculator.process('6');
	    calculator.process('/');
	    calculator.process('7');
	    expect(calculator.calculateResult()).toBe(8);
	});

	it("back operator should work correctly", function() {
		calculator.process('8');
		calculator.process('5');
		calculator.process('back');
		expect(calculator.calculateResult()).toBe(8);
	});

	it("back operator should work correctly when other operation has been perfromed", function() {
		calculator.process('8');
		calculator.process('5');
		calculator.process('+');
		calculator.process('7');
		calculator.process('0');
		calculator.process('back');
		expect(calculator.calculateResult()).toBe(92);
	});

	it("clear operator should work correctly", function() {
		calculator.process('8');
		calculator.process('5');
		calculator.process('+');
		calculator.process('7');
		calculator.process('0');
		calculator.process('clear');
		expect(calculator.calculateResult()).toBe(0);
	});

});