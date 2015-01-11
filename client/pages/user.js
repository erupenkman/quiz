$(function() {
  var detailsTemplate = $('#user-details-template').html();
  Mustache.parse(detailsTemplate);
  $.ajax({
    method: 'GET',
    url: '/auth/currentUser',
    success: function(res) {
      var rendered = Mustache.render(detailsTemplate, {
        name: res.name
      });
      $('#user-details-container').html(rendered);
    }
  });
});