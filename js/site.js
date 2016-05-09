var bgImage = true;

$(document).ready(function(){
	//DOM Element 1/4
	$('header').load('navbar.htm');
	
	loadServicePreview();
	
	
	//Event bubbling
	loadAboutEvents();
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
	domElement2.click(serviceSummaryShowHide);
	domElement3.click(serviceSummaryShowHide);
	domElement4.click(serviceSummaryShowHide);
}

function serviceSummaryShowHide(){
	//scoping
	var serviceOffering = $('main > section > nav > ul > li');
	
	//show hide the descriptions without using an li element id
	$('section', serviceOffering).addClass('hidden');
	$(this).children('section').filter(':first').removeClass('hidden');
}

function loadAboutEvents(){
	//scoping
	var aboutArea = $('div.about');
	var aboutInfoArea = $('div.aboutInfo');
	
	//base event
	aboutArea.click(function (){
		if(bgImage){
			$(this).removeClass('default');
			$(this).addClass('new');
			bgImage = false;
		}
		else{
			$(this).removeClass('new');
			$(this).addClass('default');
			bgImage = true;
		}		
	});
	
	//bubbling events on children
	$('i', aboutArea).each(function (index){
		index = Number(index) + 1;
		var that = $('h1', aboutInfoArea).filter(':nth-child(' + index + ')');
		
		$(this).click(function (event){
			if(index % 2 != 0) { //only propagate on odd indexes
				event.stopPropagation();
			}
			that.siblings().hide();
			that.toggle();
		})
	});
	
	//context menu
	//TODO: option to reset
}