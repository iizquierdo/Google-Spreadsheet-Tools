  var ssID ="1UhqOFHNKzVZcfDJQJdav0U_1vY6lxZ_Zvq_X-Eb82IU";
 
 function filtroEstado (){
        let ss = SpreadsheetApp.openById(ssID).getSheetByName("HR Vacantes");
        let filter = ss.getFilter();
        filter.removeColumnFilterCriteria(4);
        // Builds the filter criteria to use as a parameter for setColumnFilterCriteria.
        const criteria = SpreadsheetApp.newFilterCriteria()
                                    .whenTextContains("Activa")
                                    .build();

        filter.setColumnFilterCriteria(4, criteria);
        copiarValores();
        //Browser.msgBox('Datos Copiados!');
        
} 

function copiarValores() {
  var sprsheet = SpreadsheetApp.openById(ssID)
  var sheet    = sprsheet.getSheetByName("HR Vacantes");
  var range    = sheet.getRange("R:R");
  range.copyTo(sheet.getRange("Data!C:C"), {contentsOnly: true});
  //Browser.msgBox('Datos Copiados!');
} 