
function sendEmailWithAttachment(row)
{
  const datta = getClientInfo(row);
  const fileId = datta.docuId 
  const file = DriveApp.getFileById(fileId);
  var pdfConvert = file.getAs(MimeType.PDF)
  
  // Email Template
  var template = HtmlService
      .createTemplateFromFile('email-template');
      template.datta = datta;
  var message = template.evaluate().getContent();
  
  // Send Email
  MailApp.sendEmail({
    to: datta.emailDistributionList,
    subject: "Actualizacion proyecto: " + datta.projectName,
    htmlBody: message,
    attachments: [pdfConvert]
  });
  
}

function getClientInfo(row)
{
   var sheet = SpreadsheetApp.getActive().getSheetByName('Respuestas');
   
   var values = sheet.getRange(row,1,row,20).getValues();
   var rec = values[0];
  
  var datta = 
      {
        date:                   rec[0],
        summary:                rec[1],
        accomplished:           rec[2],
        locked:                 rec[3],
        nextStep:               rec[4],
        creatorEmail:           rec[5],
        projectClient:          rec[6],
        projectName:            rec[7],
        client:                 rec[8],
        emailDistributionList:  rec[9],
        status:                 rec[10],
        docuId:                 rec[11],
        docuUrl:                rec[12],
      };

  return datta;
}

function sendFormToAll()
{
   var sheet = SpreadsheetApp.getActive().getSheetByName('Respuestas');
   var last_row = sheet.getDataRange().getLastRow();
   var ui = SpreadsheetApp.getUi();
  
   for(var row=2; row <= last_row; row++)
   {
    var estado = sheet.getRange(row,12)
    var values = estado.getValues();  
    
    sheet.getRange(row,10).setFormula("=vlookup(G" + row + " ;Info!A:D;4;FALSE)"); // Busca emails
    sheet.getRange(row,9).setFormula("=vlookup(G" + row + " ;Info!A:D;3;FALSE)");  // Busca el cliente
    sheet.getRange(row,8).setFormula("=vlookup(G" + row + " ;Info!A:D;2;FALSE)");  // Busca el proyecto
    
    if(values[0][0] != "Email Enviado" ) {
          var response = ui.alert('Enviar Email', 'Esta a punto de enviar un email ¿Desea continuar?', ui.ButtonSet.YES_NO);
          if (response == ui.Button.YES) {
            sendEmailWithAttachment(row);
            sheet.getRange(row,11).setValue("Email Enviado");
          } 
     }

   }
}


