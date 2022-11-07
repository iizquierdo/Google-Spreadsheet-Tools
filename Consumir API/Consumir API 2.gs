function GetVacanciesHR()
{

   
  var sprsheet  = SpreadsheetApp.getActiveSpreadsheet();
  var sheet     = sprsheet.getSheetByName("HR Vacantes");  // Colocar el nombre de la hoja de calculo

 var token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJzb29mdGdsb2JhbCIsInNjcCI6WyJ1c2VyczpyZWFkIiwicG9zdHVsYW50czpyZWFkIiwicG9zdHVsYW50czp3cml0ZSIsInZhY2FuY2llczpyZWFkIiwidmFjYW5jaWVzOndyaXRlIiwiYWNjb3VudF9sb2NhbGl0aWVzOndyaXRlIiwiYWNjb3VudF9sb2NhbGl0aWVzOnJlYWQiLCJhY2NvdW50X2xvZ29zOnJlYWQiLCJhY2NvdW50X3N0YWdlczpyZWFkIiwiYWNjb3VudF9pbnRlZ3JhdGlvbnM6cmVhZCIsImFjY291bnRfaW50ZWdyYXRpb25zOndyaXRlIiwiYWNjb3VudF9pbnRlZ3JhdGlvbnM6ZGVsZXRlIiwiY29tdW5lczpyZWFkIiwiYWNjb3VudF9hcmVhczpyZWFkIiwiYWNjb3VudF9hcmVhczp3cml0ZSIsInVzZXJzOndyaXRlIiwidXNlcnM6ZGVsZXRlIiwiYmlsbGluZzpyZWFkIiwiYmlsbGluZzp3cml0ZSIsInBpcGVsaW5lczp3cml0ZSIsInBpcGVsaW5lczpyZWFkIl0sInVybyI6ImFkbWluIiwidWlkIjoiNjMxMGFlMDhhM2MzNTI2MDYyNzhmOTU4IiwidWVtIjoiaWdpenF1aWVyZG9Ac29vZnQuY29tLmFyIiwidXVuIjoiaWdpenF1aWVyZG8iLCJzdWIiOiJzb29mdGdsb2JhbCIsImFleCI6MTY4OTczNTYwMCwiYWN0IjoiY29tcGFueSIsImFjYyI6MSwicGFyIjoib2F1dGgyLXVzZXIiLCJpYXQiOjE2Njc0MDA5NzMsImV4cCI6MTY2NzQ4NzQwM30.PkA6ztuj6fwEwFSg5LOHthaLd-J2acUHkIXwoNHL2Hs";

    var api = "https://api.hiringroom.com/v0/vacancies?token=" + token  ;  
  
    var headers = {
      "Content-Type" : "application/json",
    };
 
    var options =  {
      'headers': headers,
      'method' : "GET",
    };

    var response = UrlFetchApp.fetch(api, options);
    var json = JSON.parse(response.getContentText());

    for(var i = 0 ; i < json["vacantes"].length ; ++i)  
        {
            var data = json["vacantes"][i];

            var values = [[ 
                i + 1,
                data.refId,
                data.nombre,
                data.estadoActual,
                data.ubicacion.pais,
                data.salarioOfrecido,
                data.razonBusqueda,
                data.jerarquia,
                data.posicionesACubrir,
                data.tags,
                data.area.responsable,
                data.area.emailResponsable,
                data.modalidadTrabajo,
                data.gestion,
                data.fechaCreacion,
                data.tipoTrabajo,
            ]];

            // Inserta la informacion en en el excel
            var fila = (i+1) + 1;
            var range1 = "A" + fila;
            var range2 = "P" + fila;

            var range = sheet.getRange(range1 + ":" + range2);
            range.setValues(values);

        }
    }