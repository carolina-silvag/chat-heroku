$(function () {
  $('#home').hide()
  /*$('#myModal').modal();*/
  var username = '';
  var socket = io();
  $('#form-msg').submit(function() {
    var param = { 
      'msg' : $('#m').val(), 
      'username' : username
    };
    socket.emit('chat message', param);
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(param){
    if (param.msg !== '') {
      let message = `<li>
                    <tr>  
                    <th scope="row">
                      <div class="row">
                        <div class="col-1">
                          <img class="img rounded-circle img-thumbnail img-fluid" src="https://robohash.org/${param.username}?set=set4">
                        </div>
                        <div class="col-11">
                          <div class="row">
                            <span><strong>${param.username}:</strong></span>
                          </div>
                          <div class="row">
                            <p>${param.msg}</p>
                          </div>
                          <div class="row">
                            <span>${moment().format('LT')}</span>
                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                  </li>`
    console.log(param.msg);
    $('#messages').prepend(message);
    window.scrollTo(0, document.body.scrollHeight);
    } else {
      alert(`Please enter a message, ${username}`)
    }
  });
  socket.on('updateUser', function(userConnected){
    console.log(userConnected);
    $('#listUser').html('');
    for (var i = 0; i < userConnected.length; i++) {
      let user = `<tr>  
                    <th scope="row">
                      <a href="#">
                        <div class="row">
                          <div class="col-4"><img class="img rounded-circle img-thumbnail img-fluid" src="https://robohash.org/${userConnected[i]}?set=set4"></div>
                          <div class="col-8"><span>${userConnected[i]}</span></div>
                        </div>
                      </a>
                    </th>
                  </tr>`
      $('#listUser').append(user);
    }
  });

  $('#save').on('click', function() {
    $('#login').hide();
    $('#home').show();
    username = $('#userName').val();
    let user = `
                <div class="row">
                  <div class="col-5">
                    <img class="img rounded-circle img-thumbnail img-fluid" src="https://robohash.org/${username}?set=set4">
                  </div>
                  <div class="col-7">
                    <a>${username} </a>
                  </div>
                </div>
              `
    $('#user').append(user);
    socket.emit('login', username);
  });

  $('#logout').click(logout);
  function logout() {
    console.log('cerrar sesion username');
    socket.emit('logout', username);
    $('#login').show();
    $('#home').hide();
  }

});
$('#form-avatar').submit(crearAvatar);

$('#btn-ingresar').hide();

function crearAvatar() {
  let name = $('#userName').val();
  console.log(name);
  let img = `<p for="">Tu Avatar Gatuno</p>
            <img class="img img-thumbnail img-fluid" src="https://robohash.org/${name}?set=set4">`;
  $('.avatar').html(img);
  $('#btn-ingresar').show();
  return false;
}
