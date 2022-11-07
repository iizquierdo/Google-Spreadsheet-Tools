var ssID ="1UhqOFHNKzVZcfDJQJdav0U_1vY6lxZ_Zvq_X-Eb82IU";
var formID ="1ooG8GvUmmVWMFY4oU2AeUN24mx14B3HN1bxlGvPSbvQ";

var wsData = SpreadsheetApp.openById(ssID).getSheetByName("Data");
var form = FormApp.openById(formID);

//Logger.log(ClintesRange.getValues());


function updateFormData() {

  // Actualiza Clientes Dropdown
  var ClintesRange = wsData.getRange("A2:A100");
  var clientesItem = form.getItemById(1932695093);
  var cientesValues = ClintesRange.getValues().filter(String);
  clientesItem.asListItem().setChoiceValues(cientesValues);

  // Actualiza Reclutador Dropdown
  var reclutadoresRange = wsData.getRange("B2:B100");
  var recluradoresItem = form.getItemById(793411402);
  var reclutadoresValues = reclutadoresRange.getValues().filter(String);
  recluradoresItem.asListItem().setChoiceValues(reclutadoresValues);

  // Actualiza Vacantes Dropdown

  var vacantesRange = wsData.getRange("C2:C500");
  var vacantesItem = form.getItemById(1737228991);
  var vacantesValues = vacantesRange.getValues().filter(String);
  

  vacantesItem.asListItem().setChoiceValues(vacantesValues);

  filtroEstado();

}

/* function saberCualEsElID() {
  // 
  var item = form.getItemById(1737228991);
  Logger.log(item.getTitle());
 // Logger.log(item);
  var items = form.getItems();
  Logger.log(items[1].getId().toString());
} */



 