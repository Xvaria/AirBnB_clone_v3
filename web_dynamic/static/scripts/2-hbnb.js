$(document).ready(function (avail) {
  // Get API status
  $.getJSON('http://00.0.0:5001/api/v1/status/', function (json) {
  object = json.status;
  if (object == 'OK') {
    $('DIV#api_status').addClass('available');
    $('DIV#api_status').css('background-color', '#ff545f');
  }
  else {
	$('DIV#api_status').removeClass('available');
  }});

  // Checked amenities:
  const obj = {};
  $('div.amenities li input').change(function () {
    if ($(this).is(':checked')) {
      obj[($(this).attr('data-id'))] = $(this).attr('data-name');
    } else {
      delete obj[($(this).attr('data-id'))];
    }
    $('div.amenities h4').html(Object.values(obj).join(', '));
  });
});
