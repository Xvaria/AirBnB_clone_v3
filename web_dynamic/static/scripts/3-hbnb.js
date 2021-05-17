$(document).ready(function (avail) {
  // Get API status
  $.getJSON('http://127.0.0.1:5001/api/v1/status/', function (json) {
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
  $('button').click(function () {
	$.ajax('http://127.0.0.1:5001/api/v1/places_search/', {
	  type: 'POST',
	  contentType: 'application/json',
	  data: JSON.stringify({}),
	  success: data => {
		for (const place of data) {
		  const file_html = `<article>\
            <div class="title_box">\
              <h2>${place.name}</h2>\
              <div class="price_by_night">\
                $${place.price_by_night}\
              </div>\
            </div>\
            <div class="information">\
              <div class="max_guest">\
                ${place.max_guest} Guests\
              </div>\
              <div class="number_rooms">\
                ${place.number_rooms} Bedrooms\
              </div>\
              <div class="number_bathrooms">\
                ${place.number_bathrooms} Bathroom\
              </div>\
            </div>\
            <div class="description">\
              ${place.description}\
            </div>\
          </article>`;
		  $('section.places').append(file_html);
		}
	  }
	});
  });
});
