let deliveryRadioValue = document.querySelector('.radio-one'),
    lengthPathForm = document.querySelector('#LengthPathForm'),
    inputWeight = document.querySelector('.input_weight'),
    inputVolume = document.querySelector('.input_volume'),
    optionsPassanger = document.querySelector('#pass'),
    costInput = document.querySelector('.cost_input'),
    buttonCalculate = document.querySelector('.calculate'),
    buttonClear = document.querySelector('.clear');

const calc = {
  knowShoiceDelivery() {
    return deliveryRadioValue.checked ? 1.4 : 1;
  },

  getDistance() {
    return +lengthPathForm.value
  },

  getPass() {
    if(optionsPassanger.selectedIndex == 1) {
       return 1300
     }
     else {
       return 0
    }
  },

  getWeight() {
    let value = +inputWeight.value;

    if (value <= 1) {
      return 4
    }
    else if (value > 1 && value <= 4) {
      return 8
    }
    else if (value > 4 && value <= 10) {
      return 20
    }
    else if (value > 10 && value <= 13) {
      return 26
    }
    else {
      return 35
    }

  },

  getVolume() {
    let value = +inputVolume.value;

    if (value <= 6) {
      return 2
    }
    else if (value > 6 && value <= 12) {
      return 4
    }
    else if (value > 12 && value <= 20) {
      return 6
    }
    else {
      return 0
    }
  }

}

buttonCalculate.addEventListener('click', function() {
  let total = (calc.getWeight() + calc.getVolume()) * calc.getDistance() * calc.knowShoiceDelivery(),
  expTotal = 700 + calc.getPass();

  costInput.value = (total + expTotal).toFixed(2)
})
