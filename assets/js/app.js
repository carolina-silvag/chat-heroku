$(function () {
  $('#home').hide()
  /*$('#myModal').modal();*/
  var username = '';
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    if (msg !== '') {
      let message = `<li>
                    <tr>  
                    <th scope="row">
                      <i class="fa fa-user"></i>
                      <span>${username}</span>
                      <p>${msg}</p>
                      <span>${moment().format('LT')}</span>
                    </th>
                  </tr>
                  </li>`
    console.log(msg);
    $('#messages').prepend(message);
    window.scrollTo(0, document.body.scrollHeight);
    } else {
      alert(`Please enter a message, ${username}`)
    }
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
  });

  $('#save').on('click', function() {
    $('#login').hide();
    $('#home').show();
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