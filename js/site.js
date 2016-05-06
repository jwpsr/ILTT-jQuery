$(document).ready(function(){
	//DOM Element 1/4
	$('header').load('navbar.htm');
	
	loadServicePreview();
});

function loadServicePreview(){
	//scoping
	var servicePreview = $('main > section > nav');
	
	//DOM element 2/4
	var domElement2 = servicePreview.find('li').filter(':first');
	
	//DOM element 3/4
	var domElement3 = $('li', servicePreview).first().next(); //.filter(':nth-child(2)')
	
	//DOM element 4/4
	var domElement4 = $('main li').filter(':last');
	
	//add css using object literal
	domElement2.css({
		'background-image': 'url(' + 'imgs/fashion1.jpg' + ')',
		'background-size': '200%',
    	'background-position': '25% 0'
	});
	
	domElement3.css({
		'background-image': 'url(' + 'imgs/wedding.jpg' + ')',
		'background-size': '180%',
    	'background-position': '45% 0'
	});
	
	domElement4.css({
		'background-image': 'url(' + 'imgs/fam2.jpg' + ')',
		'background-size': '180%',
    	'background-position': '45% 0'
	});
	
	//add service description click events
	domElement2.click(showHide);
	domElement3.click(showHide);
	domElement4.click(showHide);
}

function showHide(){
	//show hide the descriptions without using an li element id
	$('details').addClass('hidden');
	$(this).children('details').filter(':first').removeClass('hidden');
}