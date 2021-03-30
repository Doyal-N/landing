'use strict';

//parallax
$(document).ready(function() {
  $(window).scroll(function(event) {
    var top = $(this).scrollTop(),
      width = $(this).outerWidth(),
      content = $('.wrapper').outerHeight(),
      parallax = $('.parallax').outerHeight(),
      procent = top / content * 100,
      paraProcent = top / parallax * 100,
      opacity = 1 - 1 / 100 * paraProcent;
      var z = 1 +(width / 10000 * paraProcent);

      $('.fog').css('transform', 'scale('+z+')');
      $('.fog').css('opacity', opacity)

      var bigMountain = 1 + (width / 1000000 * procent)
      $('.mountain-1').css('transform', 'scale('+bigMountain+')');

      var hr = width / 2000 * paraProcent,
      z2 = 1 + (width * 0.000005 * paraProcent)
      $('.mountain-2').css('transform', 'translate3d('+hr+'px, 0, 0) scale('+z2+')');

      var hr2 = width / 1500 * paraProcent,
      z3 = 1 + (width * 0.00001 * paraProcent)
      $('.mountain-3').css('transform', 'translate3d('+hr2+'px, 0, 0) scale('+z3+')')

      $('.wrapper').css('z-index', '2')
  });
});

//открытие-закрытие попап
const togglePopup = () => {
  const openPopup = document.querySelectorAll('.open_popup'),
    popupClose = document.querySelector('.popup_close'),
    popupContent = document.querySelector('.popup_content'),
    popup = document.getElementById('popup');

  const handlerPop = () => {
    popup.classList.toggle('popup--visible');
  }

  for (let i = 0; i < openPopup.length; i++) {
    openPopup[i].addEventListener('click', () => {
      handlerPop();
    })
  }

  popupClose.addEventListener('click', (event) => {
    let target = event.target;
    if (target.matches('.popup_close')) {
      handlerPop();
    };

  })

  popup.addEventListener('click', (event) => {
    let target = event.target;
    target = target.closest('.popup_content');
    if (!target) {
      handlerPop();
    }
  })

}
togglePopup();

//ползунки
const showValuesRanges = () => {
  const inputKg = document.querySelector('.input_kg'),
    inputTn = document.querySelector('.input_tn'),
    boxKg = document.querySelector('.range_k'),
    boxTn = document.querySelector('.range_t'),
    inputWeight = document.querySelector('.input_weight');

  inputKg.addEventListener('change', function () {
    boxKg.textContent = this.value + "кг";
    inputWeight.value = this.value / 1000 + Number(inputTn.value);
  })

  inputTn.addEventListener('change', function () {
    boxTn.textContent = this.value + "тн";
    inputWeight.value = inputKg.value / 1000 + Number(this.value)
  })
}

showValuesRanges();

//валидация инпутов
const validInputs = () => {
  const inputsText = document.querySelectorAll('.input_text'),
    inputsNumber = document.querySelectorAll('.input_number');

  let regNum = /^[0-9A-Z\.\\]$/i;
  for (let i = 0; i < inputsText.length; i++) {
    inputsText[i].addEventListener('input', () => {
      inputsText[i].value = inputsText[i].value.replace(regNum, '');
    })
  }

  for (let i = 0; i < inputsNumber.length; i++) {
    inputsNumber[i].addEventListener('input', () => {
      inputsNumber[i].value = inputsNumber[i].value.replace(/^[a-zа-я//\\\-\+=]$/i, '');
    })
  }

}
validInputs();

//маска телефона
function maskPhone(selector, masked = '+7 (___) ___-__-__') {
  const elem = document.querySelector('#user-phone');

  function mask(event) {
    const keyCode = event.keyCode;
    const template = masked,
      def = template.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");
    let i = 0,
      newValue = template.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
    i = newValue.indexOf("_");
    if (i != -1) {
      newValue = newValue.slice(0, i);
    }
    let reg = template.substr(0, this.value.length).replace(/_+/g,
      function (a) {
        return "\\d{1," + a.length + "}";
      }).replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
      this.value = newValue;
    }
    if (event.type == "blur" && this.value.length < 5) {
      this.value = "";
    }

  }
  elem.addEventListener("input", mask);
  elem.addEventListener("focus", mask);
  elem.addEventListener("blur", mask);

}
maskPhone();
//кнопка сбросить
const resetInputs = function () {
  let clearButton = document.querySelector('.clear')

  clearButton.addEventListener('click', function () {
    let inputs = document.getElementsByTagName('input')

    for (let i = 0; i < 10; i++) {
      if (inputs[i].classList.contains('input_range')) {
        inputs[i].value = 0
      } else {
        inputs[i].value = ''
      }
    }

    document.querySelector('.range_k').textContent = '0кг'
    document.querySelector('.range_t').textContent = '0тн'

  })

}

resetInputs()
