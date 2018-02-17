Stripe.setPublishablekey('pk_test_UT3sJqMxU5bAwwpWMjAOgiZL');

var $form = $('#checkout-form');
$form.submit(function(event){
  $('#charge-error').addClass('hidden');  
  $form.find('button').prop('disabled', true);
  Stripe.card.createToken({
    number: $('#card-number').val(),
    cvc: $('#card-cvc').val(),
    exp_month: $('#card-expiry-month').val(),
    exp_year: $('#card-expiry-year').val(),
    name: $('#card-name').val()
  }, stripeResponseHandler);
  return false;
});

function stripeResponseHandler(status, response){
  if (response.error) {
    // show errors in the form
    $('#charge-error').text(response.error.message);
    $('#charge-error').removeClass('hidden');
    $form.find('button').prop('disabled', false);
  }else{
    var token = response.id;

    // insert the token into the form
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));

    // submit the form
    $form.get(0).submit();
  }
}