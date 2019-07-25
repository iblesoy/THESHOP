var App = function(){
	'use strict';

	var $_html, $_body, $_wrap, $_header, $_container, $_contents, $_aside, $_footer;

	/*
	 ********************************************************************************************
	 *
	 * BASE UI FUNCTIONALITY
	 *
	 *********************************************************************************************
	 */
	var init = function(){
		console.log('App init');
		$_html = $('html');
		$_body = $('body');
		$_wrap = $('#wrapper');
		$_header = $('#header');
		$_container = $('#container');
		$_contents = $('#contents');
		$_aside = $('#aside');
		$_footer = $('#footer');

		common.init();
	}

	var common = {
		init: function(){
			console.log('App common');
			common.oscheck();
			if ($_header.length) common.header();
			if ($_aside.length) common.aside();
			if ($_container.length) common.container();
			if ($_footer.length) common.footer();
		},
		oscheck: function(){
			var ua = navigator.userAgent;
			if (ua != null && typeof ua != 'undefined') {
				if (ua.toLowerCase().indexOf('android') > -1) {
					$('html').addClass('os__android');
				} else if (ua.toLowerCase().indexOf('iphone') > -1) {
					$('html').addClass('os__ios');
				}
			}
		},
		header: function() {

		},
		aside: function() {
			$_aside.find('.box__navigation').hover(
				function(){
					$(this).addClass('box__navigation--active');
				},
				function(){
					$(this).removeClass('box__navigation--active');
				}
			)
		},
		container: function() {
			var hWindow = $(window).height();
			var hHeader = $_header.outerHeight();
			var hFooter = $_footer.outerHeight();
			($_wrap.hasClass('header-fixed')) ? $_container.css('min-height', hWindow - hFooter) : $_container.css('min-height', hWindow - (hHeader + hFooter)) ;
		},
		footer: function() {
			// var currnetDate  = new Date();
			// var copyYear = (currnetDate.getFullYear() === 2014) ? '2014' : '2014 ~ ' + currnetDate.getFullYear().toString() ;
			// $_footer.append('<div class="js-copyright">Copyright &copy; '+ copyYear +' <strong>GROUND</strong> All rights reserved.</div>');
		}
	}


	/*
	 ********************************************************************************************
	 *
	 * UI HELP
	 *
	 ********************************************************************************************
	 */

	 /*
	 * App.help('show');
	 * App.help({'show','#test});
	 * App.help([{'show','#test},{'hide','#test}]);
	 */
	var help = {
		init: function($function, $element){
			if ($function instanceof Array) {
				for(var $index in $function) {
					if ($function[$index] instanceof Object){
						var $functionObject = $function[$index];
						for(var $indexObject in $functionObject) {
							help.helps($indexObject, $functionObject[$indexObject]);
						}
					}else{
						help.helps($function[$index], $element);
					}
				}
			} else if ($function instanceof Object){
				for(var $index in $function) {
					help.helps($index, $function[$index]);
				}
			} else {
				help.helps($function);
			}
		},
		helps: function($function, $element) {
			switch ($function) {
				case 'show':
					help.show($element);
					break;
				case 'hide':
					help.hide($element);
					break;
				case 'modal':
					help.modal($element);
					break;
				default:
					return false;
			}
		},
		show: function($element) {
			console.log('==== uiShow', $element)
		},
		hide: function($element){
			console.log('==== uiHide', $element)
		},
		modal: function($element){
			console.log('==== uiModal', $element)
		}
	}

	return {
		init: function($function){
			init();
		},
		help: function($function, $element){
			help.init($function, $element);
		}
	}
}();

$(function () {
	if (typeof angular == 'undefined') {
		App.init();
	}
});