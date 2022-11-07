function GetAPIData()
{
    var api = "https://api.hiringroom.com/v0/authenticate/login/users";  // API URL
 
    //Esto son solo ejemplos. Cada API tendra sus variables de header que tendreis que verlo en su documentación
    var headers = {
      "Content-Type" : "application/json",
    };

   //Esto son solo ejemplos. Cada API define su payload en la documentación
    var payload =
   {
      "grand_type": "password",
      "client_id": "sooftglobal",
      "client_secret": "a9399c4d4cbc62d722901a18616a6685",
      "username": "igizquierdo@sooft.com.ar",
      "password": "mardel00"
    }
 
    var options =
    {
      'headers': headers,
      'method' : "POST",
      'payload' : JSON.stringify(payload),
    };

    var response = UrlFetchApp.fetch(api, options);

    //Generalmente las APIs devuelven JSON aunque podrían devolver otras cosas
    var json = JSON.parse(response.getContentText());
    Logger.log('Este es el Token: ' + json.token);
    return json;
}