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

$('#exoModModal').on('show.bs.modal',function(event){
  var button = $(event.relatedTarget);
  var id = button.data('id');
  var selectorName = '#tr'+id;
  var tr = $(selectorName);
  var typeId=tr.children('.idType').val();
  var question = tr.children('.rowQuestion').html();
  var answer = tr.children('.rowAnswer').html();
  console.log(typeId);
  var modal = $(this);
  
  //console.log(this);
  modal.find('#idMod').val(id);
  modal.find('#typeIdMod').val(typeId);
  modal.find('#questionMod').val(question);
  modal.find('#answerMod').val(answer);

});

function modExo(){
  var id = parseInt($('#idMod').val().toString(),10);
  var typeId = $('#typeIdMod').val();
  var question = $('#questionMod').val();
  var answer = $('#answerMod').val();
  var data = {
    id:id,
    typeId:typeId,
    question:question,
    answer:answer
  };
  console.log(JSON.stringify(data));

  $.ajax({
    url: '/exos/mod',
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    complete: function () {
      location.reload();
    }
  });


};

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

