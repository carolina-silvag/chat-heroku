$(function () {
  $('#myModal').modal();
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    console.log(msg);
    $('#messages').append($('<li>').text(msg));
    window.scrollTo(0, document.body.scrollHeight);
  });
  socket.on('newUser', function(userConnected){
    console.log(userConnected);
    $('#listUser').html('');
    for (var i = 0; i < userConnected.length; i++) {
      $('#listUser').append($('<li>').text(userConnected[i]));
    }
    window.scrollTo(0, document.body.scrollHeight);
  });

  $('#save').on('click', function() {
    var username = $('#userName').val();
    socket.emit('login', username);
  });
});