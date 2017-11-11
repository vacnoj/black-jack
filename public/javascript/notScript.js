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
    // event.preventDefault();
    setTimeout(clearField, 2000);
    function clearField() {
      $('#user-name').val('');
      $('#user-password').val('');
    }
  });
});