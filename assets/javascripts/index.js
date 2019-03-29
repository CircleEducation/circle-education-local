$(function() {
  if ($('#upcoming-events').length) {
    $.ajax('https://www.eventbriteapi.com/v3/organizers/10937668459/events/?token=EFX5TSXYKK76RPDJSNBW&only_public=true&order_by=start_asc&start_date.range_start=' + moment.utc().subtract(1, 'day').format(), {
      success: function (response) {
        var $upcomingEvents = $('<div class="card-deck d-flex flex-wrap justify-content-center justify-content-xl-start align-items-center"></div>');
        response.events.slice(0, 6).forEach(function (event) {
          $upcomingEvents.append(`
          <div class="card card-frame text-center mb-5" style="min-width: 345px">
            <!-- Card -->
            <div class="card-body p-6">
              <div class="mx-auto mb-4">
                <img class="img-fluid rounded" src="${(event.logo) ? event.logo.url : ''}" alt="${event.name.text}">
              </div>
              <div class="mb-4">
                <h4 class="h6 mb-1">${event.name.html}</h4>
                <p class="text-muted">${moment.utc(event.start.local).format('ddd, MMM Do, YYYY h:mma')} - ${moment.utc(event.end.local).format('h:mma')}</p>
                <p>${event.description.text.slice(0, 200)}...</p>
              </div>
              <a class="btn btn-sm btn-soft-primary" role="button" href="${event.url}" rel="noopener noreferrer" target="_blank">View Details</a>
            </div>
            <!-- End Card -->
          </div>
        `)
        });
        $('#upcoming-events').html($upcomingEvents);
      }
    })
  }

  // var events = {
  //   submit: {
  //     '#course-guide-form': [
  //       {
  //         event: 'Course Guide Form Submit'
  //       }
  //     ]
  //   },
  //   click: {}
  // }

  // Object.keys(events).forEach(function(event) {
  //   Object.keys(events[event]).forEach(function(selector) {
  //     events[event][selector].forEach(function(event) {
  //       $(selector)[event](function(e) {
  //         e.preventDefault();
  //         dataLayer.push(event);
  //         return true;
  //       })
  //     })
  //   })
  // })
});