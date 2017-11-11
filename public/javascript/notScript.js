$(document).ready(function(){
    $('.modal').modal();


  $('#add-user').click(function() {
    event.preventDefault();
    let newUser =  {
      username: $('#new-user').val().trim(),
      password: $('#new-password').val().trim()
    }
    $.ajax({
      method: "POST",
      url: "/api/users",
      data: newUser
    }).done(console.log("User added"));
    $('#new-user').val('');
    $('#new-password').val('');
  });

  $('#login').click(function() {
    event.preventDefault();
    let user = {
      username: $('#user-name').val().trim(),
      password: $('#user-password').val().trim()
    }
  });
});