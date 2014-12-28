$(function(){
	var template = $('#food-image-template').html();
	Mustache.parse(template);   // optional, speeds up future uses
	var rendered = Mustache.render(template, {'foods':foods});
	$('#gallery').html(rendered);

	$('#next').on('click', function(){

	});
});
