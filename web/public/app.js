$(function() {

  $('.input-button').on('click', function(event) {
    event.preventDefault();
    var site = $(this).closest('form').find('.input-field').val();
    //next step - get text field send to server 
    console.log("I'm", site);
  });
  
});