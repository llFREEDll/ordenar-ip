listasMascaras = document.getElementById('listasMascaras');

for (var i = 0; i < 33; i++){
    var opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    listasMascaras.appendChild(opt);
}

const Evaluate = () =>{
  alert(listasMascaras.value);
}
