$(function () {
  $('#myModal').modal();
  var username = '';
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    let message = `<tr>  
                    <th scope="row">
                      <i class="fa fa-user"></i>
                      <span>${username}</span>
                      <p>${msg}</p>
                      <span>${moment().format('LT')}</span>
                    </th>
                  </tr>`
    console.log(msg);
    $('#messages').append(message);
    window.scrollTo(0, document.body.scrollHeight);
  });
  socket.on('newUser', function(userConnected){
    console.log(userConnected);
    $('#listUser').html('');
    for (var i = 0; i < userConnected.length; i++) {
      let user = `<tr>  
                    <th scope="row">
                      <a href="#"><i class="fa fa-user"></i>
                      <span>${userConnected[i]}</span></a>
                    </th>
                  </tr>`
      $('#listUser').append(user);
    }
    window.scrollTo(0, document.body.scrollHeight);
  });

  $('#save').on('click', function() {
    username = $('#userName').val();
    let user = `<div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <i class="fa fa-user"></i>
              <a>${username} </a>
            </div>`
    $('#user').append(user);
    socket.emit('login', username);
  });
});