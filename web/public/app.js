$(function() {

  $('.input-button').on('click', function(event) {
    event.preventDefault();
    var site = $(this).closest('form').find('.input-field').val();
    console.log('button clicked, value of input:', site);
    $.ajax({
      url: 'http://27.0.0.1:8080/',
      type: 'POST',
      data: JSON.stringify(site),
      contentType: 'application/json',
      success: function(data){
        console.log('success');
      },
      error: function(data){
        console.log('error');
      },
    }); 
    $('.input-field').empty();
  });
  
});
