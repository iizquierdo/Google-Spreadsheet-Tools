function sendFormToAll()
{
   var sheet    = SpreadsheetApp.getActive().getSheetByName('Candidatos Presentados');
   var last_row = sheet.getDataRange().getLastRow();
  // var ui       = SpreadsheetApp.getUi();
  
   for(var row=2; row <= last_row; row++){
      var estado = sheet.getRange(row,19)
      var values = estado.getValues();  

      var columValue  = sheet.getRange(row,1,row,19).getValues();
      var rec         = columValue[0];


    var datta = 
        {
          id:                               rec[0],
          candidatoNombre:                  rec[1],
          reclutador:                       rec[2],
          vacanteNombre:                    rec[3],
          observaciones:                    rec[4],
          fechaEntrevistaReclutador:        rec[5],
          fechaEntrevistaTecnica:           rec[6],
          urlFichaTecnica:                  rec[7],
          urlHiringRoom:                    rec[8],
          clienteNombre:                    rec[9],
          pretensionSalarial:               rec[10],
          pretensionSalarialContratacion:   rec[11],
          pretensionSalarialCondicion:      rec[12],
        };



      // Verifica que la columna ESTADO (Columna 19) No sea Enviado
      if(values[0][0] != "Email Enviado" ) {

          // Email Template
          var template = HtmlService
              .createTemplateFromFile('email-template');
              template.datta = datta;
          var message = template.evaluate().getContent();

          MailApp.sendEmail({
            to: "igizquierdo@sooft.com.ar",
            subject: "Presentacion: " + datta.candidatoNombre + " / " + datta.clienteNombre,
            htmlBody: message,
          });

        sheet.getRange(row,19).setValue("Email Enviado");  
      }

   }
}


