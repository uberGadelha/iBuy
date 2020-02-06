
var list = [
   {"description":"rice", "amount":"1", "value":"5.40"},
   {"description":"beer", "amount":"12", "value":"1.99"},
   {"description":"meat", "amount":"1", "value":"15.00"}
];

function getTotal(list) {
   var total = 0;
   for(var key in list) {
      total += list[key].value * list[key].amount;
   }
   return total;
}

function setList(list) {
   var table = '<thead><tr><th>Description</th><th>Amount</th><th>Value</th><th>Action</th></tr></thead><tbody>';
   for(var key in list) {
      table += '<tr><td>' + list[key].description + '</td><td>' + list[key].amount + '</td><td>' + list[key].value + '</td><td>EDIT | DELETE </td></tr>';
   }
   table += '</body>';
   document.getElementById("listTable").innerHTML = table;
}

setList(list);
console.log(getTotal(list));