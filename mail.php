api.telegram.org/bot1906325653:AAEvuSYUz4VDNX557xKb4fLN204eNM56kjc/getUpdates
<?php
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];
$token="1943965184:AAFEulzNeGuTJfFXhwAukuG62u8nlWgNPyY";
$chat_id="-551372851";
$arr = array(
    'Имя пользователя: ' => $name,
    'Телефон: ' => $phone,
    'Email' => $email,
    'message' => $message

  );
  foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b> ".$value."%0A";
  };
  $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

header('Content-Type: application/json');

if ($name === ''){
print json_encode(array('message' => 'Введите ваше имя', 'code' => 0));
exit();
}
if ($email === ''){
print json_encode(array('message' => 'Введите вашу почту', 'code' => 0));
exit();
} 
else if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  
    print json_encode(array('message' => 'Почта не коректна', 'code' => 0));
    exit();
    }  

 if ($phone === ''){
  print json_encode(array('message' => 'Введите ваш номер', 'code' => 0));
  exit();
 }


$recipient = "pachabaha@ukr.net";
$headers = 'From: repko@meb.com' . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
$subject = "Cообщение с сайта Repko";
$mess = '
    Отправитель: ' . $name . '
    E-mail:' . $email . '
    Телефон:' . $phone . '
    Вопрос: ' . $message;
    

mail($recipient,$subject,$mess,$headers  ) or die("Произошла ошибка попробуйте позже");
print json_encode(array('message' => 'Ваше сообщение успешно отправленно', 'code' => 1));
exit();
?>
