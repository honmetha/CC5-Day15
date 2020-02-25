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
  },
  down() {
    this.step--;
  },
  showStep: function() {
    alert( this.step );
  }
};