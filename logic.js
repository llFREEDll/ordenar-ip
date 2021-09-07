var listasMascaras = document.getElementById('listasMascaras');
var ip1 = document.getElementById('ip1');
var ip2 = document.getElementById('ip2');
var ip3 = document.getElementById('ip3');
var ip4 = document.getElementById('ip4');
var table = document.getElementById('table');
var broadcast = [];
var netMask = [];

for (var i = 0; i < 33; i++){
    var opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    listasMascaras.appendChild(opt);
}

const Evaluate = () =>{

   ip01 = parseInt(ip1.value);
   ip02 = parseInt(ip2.value);
   ip03 = parseInt(ip3.value);
   ip04 = parseInt(ip4.value);
   if(!isNaN(ip01)&&!isNaN(ip02)&&!isNaN(ip03)&&!isNaN(ip04)){
     var  mascara = "";
     for (var i = 0; i < listasMascaras.value; i++) {
       mascara = mascara + "1";
       }
       for (var i = mascara.length ; i < 32; i++) {
         mascara = mascara + "0";
       }

       var ip = "";
       ip = DecToBin(ip01) + DecToBin(ip02) + DecToBin(ip03) + DecToBin(ip04) ;
       let wildCard = "";
       for (var i = 0; i < 32; i++) {
         if(mascara.charAt(i) == ip.charAt(i))
          wildCard = wildCard + "1";
         else wildCard = wildCard + "0";
       }
       var flag = false;
       let cont = 0;
       while( cont < netMask.length && !flag) {
         if (netMask[cont] == listasMascaras.value && broadcast[cont] == wildCard.substr(0,listasMascaras.value)) {
           flag = true;
         }else
          cont++;
       }
       if (flag) {
         let row = table.insertRow(cont + 1);
         let cell1 = row.insertCell(0);
         let cell2 = row.insertCell(1);
         let cell3 = row.insertCell(2);
         cell1.innerHTML = "";
         cell2.innerHTML = ip01 + "." + ip02 + "." + ip03 + "." + ip04;
         cell3.innerHTML = "";
       } else {
         var ipFinal = "";
         if (listasMascaras.value <= 8) {
              ipFinal = ipFinal + BinToDec(wildCard.substr(0,listasMascaras.value));
              ipFinal = ipFinal + "." + "0" + "." + "0" + "." + "0";
        }else if (listasMascaras.value <= 16) {
          ipFinal = ipFinal + BinToDec(wildCard.substr(0,8));
          ipFinal = ipFinal + "." +BinToDec(wildCard.substring(8,listasMascaras.value));
          ipFinal = ipFinal + "." + "0" + "." + "0";
        }else if (listasMascaras.value <= 24) {
          ipFinal = ipFinal + BinToDec(wildCard.substr(0,8));
          ipFinal = ipFinal + "." +BinToDec(wildCard.substring(8,16));
          ipFinal = ipFinal + "." +BinToDec(wildCard.substring(16,listasMascaras.value));
          ipFinal = ipFinal + "." + "0";
        }else {
          ipFinal = ipFinal + BinToDec(wildCard.substr(0,8));
          ipFinal = ipFinal + "." +BinToDec(wildCard.substring(8,16));
          ipFinal = ipFinal + "." +BinToDec(wildCard.substring(16,24));
          ipFinal = ipFinal + "." +BinToDec(wildCard.substring(24,listasMascaras.value));
        }
        broadcast.push(wildCard.substr(0,listasMascaras.value));
        netMask.push(listasMascaras.value);

        var thead = document.createElement('thead');
         var tr = document.createElement('tr');

         
         var red = document.createElement('th');
          var ipCell = document.createElement('th');
          var maskCell = document.createElement('th');

          var text1 = document.createTextNode(ipFinal);
          var text2 = document.createTextNode("/" + listasMascaras.value);
          var text3 = document.createTextNode("Red: ");

          red.appendChild(text3);
          ipCell.appendChild(text1);
          maskCell.appendChild(text2);

          tr.appendChild(red);
          tr.appendChild(ipCell);
          tr.appendChild(maskCell);
          thead.appendChild(tr);
          table.appendChild(thead);

          var x = table.rows.length;
          let row = table.insertRow(x);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);
          cell1.innerHTML = "";
          cell2.innerHTML = ip01 + "." + ip02 + "." + ip03 + "." + ip04;
          cell3.innerHTML = "";


       }


   }else alert ("rellena todos los campos!");
 }
   const DecToBin = number =>{
    var total="";
    var numberI=0;
    numberI=parseInt(number);
        if(numberI>0){
            while(numberI>0){
            total=parseInt(numberI%2)+total;
            numberI=parseInt(numberI/2);
        }
        while(total.length<8)
          total= "0"+total;
        return total;
        }
        else{
          while(total.length<8)
            total= "0"+total;
          return total;
        }
}
const BinToDec = number =>{

    numberI=0;
    var ch='';
    var pos=1;
        for(var i=(number.length)-1;i>=0;i--){
            ch=number.charAt(i);
            numberI=numberI+(parseInt(ch)*pos);
            pos=pos*2;
        }
        return numberI;

}
