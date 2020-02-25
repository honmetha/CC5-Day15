// Ex 1: Method Shorthand
let calculator = {
  firstNum: "",
  secondNum: "",
  read() {
    this.firstNum = +prompt('1st number');
    this.secondNum = +prompt('2nd number');
  },
  sum() {
    let sum = this.firstNum + this.secondNum;
    return sum;
  },
  mul() {
    let mulResult = this.firstNum * this.secondNum;
    return mulResult;
  }
};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );

// Ex 1: Alternative
let calculator = {
  firstNum: "",
  secondNum: "",
};

function read() {
  calculator.firstNum = +prompt('1st number');
  calculator.secondNum = +prompt('2nd number');
};

function sum() {
  let sum = calculator.firstNum + calculator.secondNum;
  return sum;
};

function mul() {
  let mulResult = calculator.firstNum * calculator.secondNum;
  return mulResult;
};

calculator.read = read;
calculator.sum = sum;
calculator.mul = mul;

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );

// Ex 2
let ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep: function() {
    alert( this.step );
  }
};

// Ex 3
function Calculator(num1, num2) {
  this.a = num1;
  this.b = num2;

  this.read = function() {
    this.a = +prompt('1st number');
    this.b = +prompt('2nd number');
  };

  this.sum = function() {
    let addResult = this.a + this.b;
    alert( "The result is: " + addResult )
  };

  this.mul = function() {
    let mulResult = this.a * this.b;
    alert( "The result is: " + mulResult )
  };
}

let calculator = new Calculator(4, 5);

calculator.read();
calculator.sum();
calculator.mul();

// Ex 4
function Accumulator(startingValue) {
  this.value = startingValue;

  this.read = function() {
    this.value += Number(prompt('Adding Number'));
  }
}

let acc = new Accumulator(4);

console.log(acc.value)

acc.read();