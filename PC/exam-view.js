var isExam = false
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

  $('.img-arm').on('click', function(){
    showImage($('.img-arm').attr('src'))
  })

  $('.img-r-body').on('click', function(){
    showImage($('.img-r-body').attr('src'))
  })

  $('.img-l-body').on('click', function(){
    showImage($('.img-l-body').attr('src'))
  })

})

function renderOptions(id, arr){
  var container = $('#' + id), obj = {}
  arr.forEach(function(ele){
    container.append('<option value="' + ele.value + '">' + ele.name + '</option>')
    obj[ele.value] = ele.name
  })
  container.parents('.info-desc').data("o", obj)
}

function getExamData(id) {
  $.getJSON('http://127.0.0.1:8233/admin/home/' + readOnly + '/examination/info/' + id, function(d){
    if(d && d.status_code == 'ok'){
      switch (d.exam.status){
        case 2:
          // 审核中
          $('.state_3').hide()
          $('.state_4').hide()
          isExam = true
          break
        case 3:
          // 通过
          $('.state_3').show()
          $('.state_4').hide()
          isExam = false
          break
        case 4:
          // 不通过
          $('.state_3').hide()
          $('.state_4').show()
          isExam = false
          break
      }
      initForm(isExam)
      if(d.exam.feedback){
        $('.failed-desc').html(d.exam.feedback).show()
      } else {
        $('.failed-desc').html('').hide()
      }
      /* 填充照片 */
      $('.license').attr('src', d.infoImgs.license)
      $('.id-cord').attr('src', d.infoImgs.idcard)

      $('.img-arm').attr('src', d.examImgs.uLimbs)
      $('.img-r-body').attr('src', d.examImgs.rBody)
      $('.img-l-body').attr('src', d.examImgs.lBody)


      renderUserInfo(d.info, d.exam)
      renderHeight(d.examData.height, (d.info.gender == 1))
      renderArm(d.examData.arm)
      renderObstacle(d.examData.body)
      renderLeg(d.examData.leg)
      renderEyes(d.examData.vision, d.exam.applyType)
      renderHearing(d.examData.hearing)
      renderColor(d.examData.color)
      renderSwiperImages(d.monitorImgs)

      $('#pass').on('click', function(){
        bindReportModal(true)
      })

      $('#passnot').on('click', function(){
        bindReportModal(false)
      })
    }
  })
}

function initForm(){
  $('.init-clear').html('')
  $('.init-active').removeClass('active')
  $('.exam-item').removeClass('warn')
  // $('.swiper-scroll-container').empty()
  // $('.swiper-scroll-container').parents('.swiper-container').show()

  if(isExam){
    $('.before-exam').show()
    $('.exam-success').hide()
    $('.fix-tag').addClass('fix-show')
    $('.bottom-action-panel').show()
  } else {
    $('.exam-success').show()
    $('.before-exam').hide()
    $('.fix-tag').removeClass('fix-show')
    $('.bottom-action-panel').hide()
  }
  $(document).scrollTop = 0
}

function renderUserInfo(info, exam){
  /* 填充申请车型 */
  $('#vehicleType').html(exam.vehicleType)
  /* 填充申请人信息 */
  $('#userName').html(info.name)
  $('#userSex').html(info.genderName)
  $('#userBirth').html(formatTs(info.birthDate))
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

function renderHeight(height, isMan){
  $('.exam-height .value input').val(height)
  $('.exam-height .value.exam-success').html(height)
  if(isExam){
    if(height <= 150 || ((isMan && height >= 185) || (!isMan && height >= 175))){
      $('.exam-height').parents('.exam-item').addClass('warn')
    }
  }
}

function renderArm(arm){
  $('.exam-arm-left select').val(arm.left)
  $('.exam-arm-left .exam-success').html($('.exam-arm-left').parents('.info-desc').data('o')[arm.left])

  $('.exam-arm-right select').val(arm.right)
  $('.exam-arm-right .exam-success').html($('.exam-arm-right').parents('.info-desc').data('o')[arm.right])

  if(isExam){
    if(!(arm.left == 1 && arm.right == 1)){
      $('.exam-arm').parents('.exam-item').addClass('warn')
    }
  }
}

function renderObstacle(obstacle){
  $('.exam-obstacle select').val(obstacle)
  $('.exam-obstacle .item_' + obstacle).addClass('active')
  if(isExam){
    if(obstacle != 1){
      $('.exam-obstacle').parents('.exam-item').addClass('warn')
    }
  }
}

function renderLeg(leg) {
  $('.exam-leg-left select').val(leg.left)
  $('.exam-leg-left .exam-success').html($('.exam-leg-left').parents('.info-desc').data('o')[leg.left])

  $('.exam-leg-right select').val(leg.right)
  $('.exam-leg-right .exam-success').html($('.exam-leg-right').parents('.info-desc').data('o')[leg.right])
  if(isExam){
    if(!(leg.left == 1 && leg.right == 1)){
      $('.exam-leg').parents('.exam-item').addClass('warn')
    }
  }
}

function renderEyes(eye, applyType){
  $('.exam-eye-left').html(eye.left.value)
  $('.exam-eye-right').html(eye.right.value)

  $('.exam-correct-left select').val(eye.left.correct)
  $('.exam-correct-left .item_' + eye.left.correct).addClass('active')

  $('.exam-correct-right select').val(eye.right.correct)
  $('.exam-correct-right .item_' + eye.right.correct).addClass('active')

  if(isExam){
    if(/A1|A2|A3|B1|B2|N|P/.test(applyType)){
      console.log('===')
      if(eye.left.value < 5 || eye.right.value < 5){
        $('.exam-eye').parents('.exam-item').addClass('warn')
      }
    } else {
      if(eye.left.value < 4.9 || eye.right.value < 4.9){
        $('.exam-eye').parents('.exam-item').addClass('warn')
      }
    }
  }
}

function renderHearing(hearing){
  $('.exam-hearing-left').html(hearing.left ? '正常' : '异常')
  $('.exam-hearing-right').html(hearing.right ? '正常' : '异常')

  $('.exam-aid select').val(hearing.aid)
  $('.exam-aid .item_' + hearing.aid).addClass('active')

  if(isExam){
    if(!(hearing.left == 1 && hearing.right == 1)){
      $('.exam-aid').parents('.exam-item').addClass('warn')
    }
  }
}

function renderColor(color){
  $('.exam-color .item_' + color).addClass('active')
  if(isExam){
    if(color != 1){
      $('.exam-color').parents('.exam-item').addClass('warn')
    }
  }
}

function renderSwiperImages(monitorImgs){
  $.each($('.swiper-scroll-container'), function(index, ele){
    var imgs = []
    $(ele).attr('data-target').split(',').forEach(function(tar){
      imgs = imgs.concat(monitorImgs[tar])
    })
    if(imgs.length) {
      $(ele).css('width', 170 * imgs.length - 20)
      if($(ele).width() > $(ele).parents('.swiper-scroll').width()){
        $(ele).parents('.swiper-scroll').css('overflow-x', 'scroll')
      } else {
        $(ele).parents('.swiper-scroll').css('overflow-x', 'hidden')
      }
      $(ele).empty()
      imgs.forEach(function(img) {
        var item = $(
          '<div class="swiper-item">' +
            '<img src="' + img + '">' +
          '</div>'
        )
        item.on('click', function(){
          showImage(img)
        })
        $(ele).append(item)
      })
    } else {
      $(ele).parents('.swiper-scroll').hide()
    }
  })
}

function formatTs(ts){
  var t = new Date(ts)
  return t.getFullYear() + '年' +
    (t.getMonth() + 1) + '月' +
    t.getDate() + '日'
}

function bindReportModal(isPass){
  var modal = $('.report-modal')
  if(isPass){
    $('.modal-content', modal).empty().append('<textarea class="form-control" rows="3" placeholder="请输入备注"></textarea>')
  } else {
    $('.modal-content', modal).empty().append('<textarea class="form-control" rows="3" placeholder="请输入审核不通过的原因"></textarea>')
  }
  modal.addClass('show')
  setTimeout(function(){
    modal.addClass('fade')
  }, 10)
  $('.close', modal).on('click', function(){
    modal.removeClass('fade')
    setTimeout(function(){
      modal.removeClass('show')
    }, 300)
  })
}

function showImage(img){
  var modal = $('.image-modal')
  $('.image-container', modal).empty().append('<img src="' + img + '">')
  modal.addClass('show')
  setTimeout(function(){
    modal.addClass('fade')
  }, 10)
  $('.img-close').on('click', function(){
    modal.removeClass('fade')
    setTimeout(function(){
      modal.removeClass('show')
    }, 300)
  })
}