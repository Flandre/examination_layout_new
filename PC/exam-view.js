$(document).ready(function(){
  var query = {}, idx = (window.location + '').indexOf('?')
  window.readOnly = 'audit'

  if(idx != -1){
    var tmp = window.location + '';
    tmp = tmp.substring(idx+1);
    var tmpIdx = tmp.indexOf('#');
    if(tmpIdx > 0){ tmp = tmp.substring(0, tmpIdx); }
    tmp = tmp.split('&');
    $.each(tmp, function(){
      var t = this.split('=');
      if(t.length == 2){
        query[t[0]] = t[1];
      }
    });
  }
  window._params = query;

  /* 添加展开疾病面板 */
  $('.toggle-list').on('click', function(){
    if($(this).hasClass('active')){
      $(this).removeClass('active')
      $('.illness-list').removeClass('active')
    } else {
      $(this).addClass('active')
      $('.illness-list').addClass('active')
    }
  })


  $.getJSON('http://127.0.0.1:8233/admin/home/audit/examination/options', function(d){
    if(d && d.status_code == 'ok'){
      $.each(d.message, function(id, arr){
        renderOptions(id, arr)
      })
      // getExamData(_params['examId'])
      getExamData(4)
    }
  })

})

function renderOptions(id, arr){
  var container = $('#' + id)
  arr.forEach(function(ele){
    container.append('<option value="' + ele.value + '">' + ele.name + '</option>')
  })
}

function getExamData(id) {
  $.getJSON('http://127.0.0.1:8233/admin/home/' + readOnly + '/examination/info/' + id, function(d){
    if(d && d.status_code == 'ok'){
      var isExam = false
      switch (d.exam.status){
        case 2:
          // 审核中
          isExam = true
          break
        case 3:
          // 通过
          isExam = false
          break
        case 4:
          // 不通过
          isExam = false
          break
      }
      initForm(isExam)
      renderUserInfo(d.info, d.exam)
    }
  })
}

function initForm(isExam){
  $('.init-clear').html('')
  $('.init-active').removeClass('active')
  $('.bottom-action-panel').show()
  if(isExam){
    $('.before-exam').show()
    $('.exam-success').hide()
  } else {
    $('.exam-success').show()
    $('.before-exam').hide()
  }
}

function renderUserInfo(info, exam){
  /* 填充申请车型 */
  $('#vehicleType').html(exam.vehicleType)
  /* 填充申请人信息 */
  $('#userName').html(info.name)
  $('#userSex').html(info.genderName)
  $('#userBirth').html(info.birthDate)
  /* 填充疾病申告 */
  if(exam.mdHistory) {
    $('.illness-state-has').addClass('active')
    $('.toggle-list').addClass('active')
    $('.illness-list').addClass('active')
    exam.mdHistory.split(',').forEach(function(val){
      $('.ill_' + val).addClass('active')
    })
  } else {
    $('.illness-state-not').addClass('active')
  }

}