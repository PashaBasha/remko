function validateForm(e){var t=$(e).find(".status");if(""==e.name.value){t=t.text("Введите ваше имя");return $(e.name).addClass("invalid"),!1}if(""==e.email.value){t=t.text("Введите вашу почту");return $(e.email).addClass("invalid"),!1}if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.email.value)){t=t.text("Почта введена не коректно");return!1}if(""==e.phone.value){$(e.phone).addClass("invalid");t=t.text("Введите ваш номер телефона");return!1}if(!e.checkData.checked){t=t.text("Дайте согласие на обработку данных");return!1}let a="";e.message&&(a=e.message.value),formData={name:e.name.value,email:e.email.value,phone:e.phone.value,message:a},$.ajax({url:"mail.php",type:"POST",data:formData,success:function(a,n,i){if(t.text(a.message),a){t.text("Ваше сообщение отправленно"),$("#sendMail").attr("disabled",!0),$("#sendMail2").attr("disabled",!0),setTimeout((function(){$(".modal").modal("hide"),t.text(""),e.reset(),$("#sendMail").attr("disabled",!1),$("#sendMail2").attr("disabled",!1)}),2e3)}},error:function(t,a,n){e.status.text(t)}})}$(document).ready((function(){$((function(){var e="/"+window.location.href.split("/").pop();$(".header-menu a").each((function(){var t=$(this).attr("href");e==t&&$(this).addClass("active")}))})),document.querySelector(".second-button").addEventListener("click",(function(){document.querySelector(".animated-icon2").classList.toggle("open")})),$(".flowing-scroll").on("click",(function(){var e=$(this).attr("href");return void 0!==e&&""!==e&&$("html").animate({scrollTop:$(e).offset().top},500),!1}))}));