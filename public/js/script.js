$(document).ready(function(){
  var current = window.location.pathname;
  console.log(current);
  if(current=='/'){
    //index
    console.log('index loaded');
    $('#indexnav').addClass('active');
  }
  else if(current=='/exos'){
    //exos
    console.log('exos loaded');
    $('#exosnav').addClass('active');
  }
  else if(current=='/types'){
    //exos
    console.log('types loaded');
    $('#typesnav').addClass('active');
  }

});

function sendType() {
  if ($('#typeName').val() != '') {
    var data = {
      'name': $('#typeName').val()
    };
    $.ajax({
      url: '/types/add',
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      complete: function () {

        location.reload();
      }
    });
  } else {
    alert('输入框为空');
  }
}

function sendExo() {
  if ($('#typeId').val() != '-1'&& $('#question').val()!='' &&$('#answer').val()!='') {
    var data = {
      'typeId': $('#typeId').val(),
      'question':$('#question').val(),
      'answer':$('#answer').val()

    };
    $.ajax({
      url: '/exos/add',
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      complete: function () {
        location.reload();
      }
    });
  } else {
    alert('请输入tpye,question,answer');
  }
}

function getQuestion(){
  $('#rowQuestion').show();
  $('#hiddenAnswer').prop('type','hidden');
  $.get('/exos/get',{typeId:$('#type').val()},function(data){
    var exo = JSON.parse(data);
    $('#qID').html(exo.id);
    $('#question').html(exo.question);
    $('#hiddenAnswer').val(exo.answer);
  })
}

function getAnswer(){
  $('#hiddenAnswer').prop('type','text');
}

$('#hiddenAnswer').click(function(){
  $('#hiddenAnswer').prop('type','hidden');
});

function answerValidator(){
  console.log($('#hiddenAnswer').val());
  console.log($('#answer').val());
  if($('#hiddenAnswer').val()==$('#answer').val()){
    $('#answer').removeClass('is-invalid');
    $('#answer').addClass('is-valid');
  }
  else{
    $('#answer').removeClass('is-valid');
    $('#answer').addClass('is-invalid');
  }

}

