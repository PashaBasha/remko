

// $(document).ready(function () {
//   $("#phone").mask("+380 (999)-999999");
//   $("#phone2").mask("+380 (999)-999999");
// });


function validateForm(form) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var status = $(form).find('.status');
  if (form.name.value == "") {
    var status = status.text("Введите ваше имя");
    $(form.name).addClass("invalid")
    return false;
  }
  // if (!reName.test(form.name.value)) {
  //   var status = status.text("Некоректне імя");
  //   return false;
  // }

  if (form.email.value == "") {
    var status = status.text("Введите вашу почту");
    $(form.email).addClass("invalid")
    return false;

  }
  else if (!re.test(form.email.value)) {
    var status = status.text("Почта введена не коректно");
    return false;
  }


  if (form.phone.value == "") {
    $(form.phone).addClass("invalid")
    var status = status.text("Введите ваш номер телефона");
    return false;
  }

  if (!form.checkData.checked) {
    var status = status.text("Дайте согласие на обработку данных");
    return false;

  }

  // if (form.message.value == "") {
  //   var status = status.text("Введіть ваше повідомлення");
  //   return false;
  // }




  let message = ''
  if (form.message) {
    message = form.message.value;
  }
  let formData = {
    'name': form.name.value,
    'email': form.email.value,
    'phone': form.phone.value,
    'message': message,

  };

  var captcha = grecaptcha.getResponse();

  // 2. Если ответ пустой, то выводим сообщение о том, что пользователь не прошёл тест.
  // Такую форму не будем отправлять на сервер.
  if (!captcha.length) {
    // Выводим сообщение об ошибке
    $('#recaptchaError').text('* Вы не прошли проверку "Я не робот"');
  } else {
    // получаем элемент, содержащий капчу
    $('#recaptchaError').text('');
  }

  // 3. Если форма валидна и длина капчи не равно пустой строке, то отправляем форму на сервер (AJAX)
  if (captcha.length) {
    console.log('goood')
    // добавить в formData значение 'g-recaptcha-response'=значение_recaptcha
    formData.append('g-recaptcha-response', captcha);

  }

  // 4. Если сервер вернул ответ error, то делаем следующее...
  // Сбрасываем виджет reCaptcha
  grecaptcha.reset();
  // Если существует свойство msg у объекта $data, то...
  if ($data.msg) {
    // вывести её в элемент у которого id=recaptchaError
    $('#recaptchaError').text($data.msg);
  }
  $.ajax({
    url: "mail.php",
    type: "POST",
    data: formData,

    success: function (data, textStatus, jqXHR) {
      status.text(data.message);
      if (data) {
        status.text("Ваше сообщение отправленно");
        $('#sendMail').attr("disabled", true);
        $('#sendMail2').attr("disabled", true);
        function close() {
          $(".modal").modal("hide")
          status.text("")
          form.reset()
          $('#sendMail').attr("disabled", false);
          $('#sendMail2').attr("disabled", false);

        }
        setTimeout(close, 2000)
      }

    },
    error: function (jqXHR, textStatus, errorThrown) {
      var status = form.status.text(jqXHR);
    }
  });

}
