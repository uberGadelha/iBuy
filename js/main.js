
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
      table += '<tr><td>' + formatDesc(list[key].description) + '</td><td>' + list[key].amount + '</td><td>' + formatValue(list[key].value) + '</td><td><button class="btn btn-secondary" onclick="setUpdate(' + key + ')"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button> <button class="btn btn-danger" onclick="deleteData('+ key + ');"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td></tr>';
   }
   table += '</body>';
   document.getElementById("listTable").innerHTML = table;
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

function addData() {
   var desc = document.getElementById("desc").value;
   var amount = document.getElementById("amount").value;
   var value = document.getElementById("value").value;

   list.unshift({"description":desc, "amount":amount, "value":value});
   setList(list);
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
}

function updateData(){
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

setList(list);
console.log(getTotal(list));