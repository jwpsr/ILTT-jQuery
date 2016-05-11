var bgImage = true;
var activeServiceItem;

$(document).ready(function(){
	//DOM Element 1/4
	$('header').load('navbar.htm');
	
	loadServicePreview();
	
	//Event bubbling
	loadAboutEvents();
	
	//Animations
	loadServiceAnimations();
	
	//Defered/Promise/Ajax
	loadContactEvents();
});

function loadServicePreview(){
	//scoping
	var servicePreview = $('main > section > nav');
	
	//DOM element 2/4
	var domElement2 = servicePreview.find('li').filter(':first');
	
	//DOM element 3/4
	var domElement3 = $('li', servicePreview).first().next(); //.filter(':nth-child(2)')
	
	//DOM element 4/4
	var domElement4 = $('main nav li').filter(':last');
	
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
		});
	});
	
	//context menu
	//TODO: option to reset
}

function loadServiceAnimations(){
	//scoping
	var serviceArea = $('main > section > ul');
	
	var prop1 = {
		height: '374px',
	};
	var opt1 = {
		duration: 2000,
	};
	
	//click events
	$('li', serviceArea).each(function (){
		$(this).click(function (){
			//check to see if user clicked same object
			if(activeServiceItem.is($(this))) { return false; }
			
			//reset service area
			servicesAnimationPrep();
			
			$(this).find('div > div').filter(':first-child')
				.animate(prop1, opt1)
				.fadeTo('slow', 0.2)
				.queue(function (next){
					$(this).siblings('div').fadeIn('slow');
					next();
				});
			
			//store active service item
			activeServiceItem = $(this);
		});
	});
	
	//open first service offering
	activeServiceItem = $('li', serviceArea).filter(':first');
	activeServiceItem.find('div > div').filter(':first')
		.animate(prop1, opt1)
		.animate({ opacity: '0.2' })
		.queue(function (next){
			$(this).siblings('div').fadeIn('slow');
			next();
		});
}

function servicesAnimationPrep(){
	$('main > section > ul > li').find('div > div').filter(':first-child')
		.queue(function (next){
			$(this).siblings('div').hide();
			next();
		})
		.animate({height: '0'}, {duration: 1000})
		.animate({ opacity: '1.0' });
}

function loadContactEvents(){
	$('form').submit(function(event){
		event.preventDefault();
		
		$.when(contactDeferredPromise())
			.then(function(value){
				var deferred = $.Deferred();
				
				contactIncrementProgress(value);
				
				setTimeout(function (){
					contactCaptureFormData();
					deferred.resolve();	
				}, 2000);			
				
				return deferred.promise();
			}).done(function(){
				$('form').trigger('reset');
				$('form').show();
				contactIncrementProgress(0);
				$('.progress').hide();
			});
		
	});
}

function contactDeferredPromise(){
	var deferred = $.Deferred();
	var milliSecond = Math.floor( 10 + Math.random() * 50 );
	
	$('.progress').show();
	$('form').hide();
	
	contactIncrementProgress(milliSecond);
	
	setTimeout(function (){
		deferred.resolve(100);
	}, 5000);
	
	return deferred.promise();
}

function contactIncrementProgress(width){
	$('.progress-bar').css('width', width + '%');
	$('.progress-bar span').html(width + '%');
}

function contactCaptureFormData(){
	var submission = {
		Name: $('#inputName').val(),
		Email: $('input[type=email]').val(),
		Comments: $('textarea').val(),
		Newsletter: $('input').filter(':checkbox:checked').val()
	};
	
	console.log(JSON.stringify(submission));
}