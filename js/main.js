
var list = [
   {"description":"rice", "amount":"1", "value":"5.40"},
   {"description":"beer", "amount":"12", "value":"1.99"},
   {"description":"meat", "amount":"1", "value":"15.00"}
];

function getTotal(list) {
   var total = 0;
   for(var key in list) {
      total += list[key].value * list[key].amount;
      unit = list[key].value * list[key].amount;
   }
   document.getElementById("totValue").innerHTML = formatValue(total);
}

function setList(list) {
   var table = '<thead><tr><th>Description</th><th>Amount</th><th>Unit Price</th><th>Total Price</th><th>Action</th></tr></thead><tbody>';
   for(var key in list) {
      table += '<tr><td>' + formatDesc(list[key].description) + '</td><td>' + formatAmount(list[key].amount) + '</td><td>' + formatValue(list[key].value) + '</td><td>R$ 00,00</td><td><button class="btn btn-secondary" onclick="setUpdate(' + key + ')"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button> <button class="btn btn-danger" onclick="deleteData('+ key + ');"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td></tr>';
   }
   table += '</body>';
   document.getElementById("listTable").innerHTML = table;
   getTotal(list);
}

function formatDesc(description) {
   var str = description.toLowerCase();
   str = str.charAt(0).toUpperCase() + str.slice(1);
   return str;
}

function formatValue(value) {
   var str = parseFloat(value).toFixed(2) + "";
   str = str.replace(".", ",");
   str = "R$ " + str;
   return str;
}

function formatAmount(amount) {
   return parseInt(amount);
}

function addData() {
   if(!validation()) {
      return;
   }
   var desc = document.getElementById("desc").value;
   var amount = document.getElementById("amount").value;
   var value = document.getElementById("value").value;

   list.unshift({"description":desc, "amount":amount, "value":value});
   setList(list);
   resetForm();
}

function setUpdate(id) {
   var obj = list[id];
   document.getElementById("desc").value = obj.description;
   document.getElementById("amount").value = obj.amount;
   document.getElementById("value").value = obj.value;
   document.getElementById("btnUpdate").style.display = "inline-block";
   document.getElementById("btnAdd").style.display = "none";

   document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
}

function resetForm() {
   document.getElementById("desc").value = "";
   document.getElementById("amount").value = "";
   document.getElementById("value").value = "";
   document.getElementById("btnUpdate").style.display = "none";
   document.getElementById("btnAdd").style.display = "inline-block";

   document.getElementById("inputIDUpdate").innerHTML = "";
   document.getElementById("errors").style.display = "none";
}

function updateData(){
   if (!validation()) {
      return;
   }
   var id = document.getElementById("idUpdate").value;
   var desc = document.getElementById("desc").value;
   var amount = document.getElementById("amount").value;
   var value = document.getElementById("value").value;

   list[id] = {"description":desc, "amount": amount, "value":value };
   resetForm();
   setList(list);
}

function deleteData(id) {
   if(confirm("Do you really want to delete the item from your list?")) {
      if (id===list.length-1) {
         list.pop();
      } else if (id===0) {
         list.shift();
      } else {
         var arrAuxIni = list.slice(0, id);
         var arrAuxEnd = list.slice(id + 1);
         list = arrAuxIni.concat(arrAuxEnd);
      }
      setList(list);
   }
}

function redoList() {
   if(confirm("Do you want to redo your list?")) {
      list = [];
      setList(list);
      alert("List deleted :)");
   }
}

function validation() {
   var desc = document.getElementById("desc").value;
   var amount = document.getElementById("amount").value;
   var value = document.getElementById("value").value;
   var errors = "";

   document.getElementById("errors").style.display = "none";

   if (desc === "") {
      errors += '<p><span class="glyphicon glyphicon-warning-sign alert alert-warning" aria-hidden="true" role="alert"> Oops! It looks like you forgot to add the item name :)</span></p>';
   }

   if (amount === "") {
      errors += '<p><span class="glyphicon glyphicon-warning-sign alert alert-warning" aria-hidden="true" role="alert"> How many of this product do you need?</span></p>';
   } else if (amount != parseInt(amount)) {
      errors += '<p><span class="glyphicon glyphicon-warning-sign alert alert-warning" aria-hidden="true" role="alert"> The value entered is invalid :(</span></p>';
   }

   if (value === "") {
      errors += '<p><span class="glyphicon glyphicon-warning-sign alert alert-warning" aria-hidden="true" role="alert"> What is the price of this item?</span></p>';
   } else if (value != parseFloat(value)) {
      errors += '<p><span class="glyphicon glyphicon-warning-sign alert alert-warning" aria-hidden="true" role="alert"> The value entered is invalid :(</span></p>';
   }

   if(errors != "") {
      document.getElementById("errors").style.display = "block";
      document.getElementById("errors").innerHTML = "<br>" + errors;
      return 0;
   } else {
      return 1;
   }
}

setList(list);