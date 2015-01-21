$(function() {
	crossroads.addRoute('', function(id){
		$.get('pages/start-test.html', function(template) {
			var rendered = Mustache.render(template);
			$('body').html(rendered);
			//start timer now
		});	
	});


	crossroads.addRoute('/enter-rest', function(id){
		$.get('pages/enter-rest.html', function(template) {
			var rendered = Mustache.render(template);
			$('body').html(rendered);
			//start timer now
		});	
	});

	

	hasher.initialized.add(crossroads.parse, crossroads); //parse initial hash
	hasher.changed.add(function(newHash, oldHash){
	  crossroads.parse(newHash); // can't pass oldHash to parse
	});
	hasher.init(); //start listening for history change


});