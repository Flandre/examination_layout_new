$(document).ready(function(){
  $.getJSON('http://127.0.0.1:8233/admin/home/audit/examination/options', function(d){
    if(d && d.status_code == 'ok'){
      $.each(d.message, function(id, arr){
        renderOptions(id, arr)
      })
    }
  })
})

function renderOptions(id, arr){
  var container = $('#' + id)
  arr.forEach(function(ele){
    container.append('<option value="' + ele.value + '">' + ele.name + '</option>')
  })
}