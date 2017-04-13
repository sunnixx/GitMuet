var DATA = [];
var userName = prompt("Enter Your Username");

loadData();

$('#btnSubmit').on('click',function(){
  var input = $('#input').val();
  DATA.push(userName + ": " + input);

  $('#input').val('');

  renderHTML();
});

function renderHTML(){
  $('#container').html('');
  for(var i in DATA){
    $('#container').append("<div id="+i+">"+DATA[i]+"</div>");
  }

  saveData();
}

function saveData(){
  $.ajax({
    type:"post",
    url:"http://myazurechatapp.azurewebsites.net/",
    contentType:'application/json',
    data: JSON.stringify(DATA),
    success: function(res){
      console.log(res);
    }
  })
}

function loadData(){
  if(DATA == ''){
    $.get('http://myazurechatapp.azurewebsites.net/',function(response){
      DATA = JSON.parse(response);
    })
  }else{
    //Do nothing
  }
  renderHTML();
}
