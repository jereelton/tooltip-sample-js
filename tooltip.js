
// Global Config Variables

// Components HTML created on real time execution
var div_target_success   = "div_show_success_messeger";
var div_success_content  = "div_success_content";
var div_close_success    = "div_close_success_messeger";
var div_target_error     = "div_show_error_messeger";
var div_error_content    = "div_error_content";
var div_close_error      = "div_close_error_messeger";
var tooltip_message      = "";   // Message
var control_sucess       = "";   // Control time success messages
var control_error        = "";   // Control time error messages
var tooltip_time_visible = 7000; // Default time visible
var tooltip_time_start   = 100;  // Default time start

var tooltipCreateElements = (function() {

	var _tooltipType = null;
	var _textColor   = null;
	var _backColor   = null;

	function initCreate(args) {

		_tooltipType = args.tooltipType;
		_textColor   = args.textColor;
		_backColor   = args.backColor;

		// Tooltip for success messages
		var obj_success = document.createElement("div");
			obj_success.setAttribute("id", div_target_success);

		var obj_close_success = document.createElement("div");
			obj_close_success.setAttribute("id", div_close_success);

		obj_success.appendChild(obj_close_success);
		document.body.appendChild(obj_success);

		var content_obj_close_success = '\
		<a id="a_success" onclick="return tooltipCreateElements.SimpleCloseElements( \''+div_target_success+'\' );">\
			<div id="'+div_success_content+'"></div>\
		</a>';

		document.getElementById(div_close_success).innerHTML = content_obj_close_success;

		if(_textColor != null && _backColor != null && _tooltipType == "success") {
			document.getElementById("a_success"       ).style.color      = _textColor;
			document.getElementById(div_target_success).style.background = _backColor;
		}

		// Tooltip for success messages
		var obj_error = document.createElement("div");
			obj_error.setAttribute("id", div_target_error);

		var obj_close_error = document.createElement("div");
			obj_close_error.setAttribute("id", div_close_error);

		obj_error.appendChild(obj_close_error);
		document.body.appendChild(obj_error);

		var content_obj_close_error = '\
		<a id="a_error" onclick="return tooltipCreateElements.SimpleCloseElements( \''+div_target_error+'\' );">\
			<div id="'+div_error_content+'"></div>\
		</a>';

		document.getElementById(div_close_error).innerHTML = content_obj_close_error;

		if(_textColor != null && _backColor != null && _tooltipType == "error") {
			document.getElementById("a_error"       ).style.color      = _textColor;
			document.getElementById(div_target_error).style.background = _backColor;
		}

	}

	// Fast close element
	function SimpleCloseElements( id ) {
		
		$(document).ready(function() {
			
			$("#" + id).hide( 1000 );
			
		});
		
		return false;

	}

	return {
		initCreate: initCreate,
		SimpleCloseElements: SimpleCloseElements
	};

})();

var tooltipLoader = (function(){

	function initTooltip(args) {

		var _id         = (args.tooltipType == "success") ? div_target_success : div_target_error;
		var _message    = args.showText;
		var _start      = (args.startTime == null) ? tooltip_time_start   : args.startTime;
		var _time       = (args.closeTime == null) ? tooltip_time_visible : args.closeTime;
		var _color      = args.tooltipTextColor;
		var _background = args.tooltipBackground;

		tooltipCreateElements.initCreate({
			tooltipType: args.tooltipType,
			textColor: _color,
			backColor: _background
		});

		setTimeout(function(){
		
			$(document).ready(function() {
				
				$("#" + _id).fadeOut( 'slow' );
				$("#" + _id).fadeIn( 'slow' );
				
			});
			
			switch( _id ) {
				
				case div_target_error:
					clearTimeout( control_error );
					document.getElementById( div_error_content ).innerHTML = _message;
					control_error = setTimeout( function() { CloseElementsSetTimeout( _id ); }, _time );
				break;
				
				case div_target_success:
					clearTimeout( control_sucess );
					document.getElementById( div_success_content ).innerHTML = _message;
					control_sucess = setTimeout( function() { CloseElementsSetTimeout( _id ); }, _time );
				break;
			
			}
			
			return false;

		}, _start);
		
	}

	//Funcao para controlar close se elementos com setTimeout e Jquery
	function CloseElementsSetTimeout( _id ) {
		
		switch( _id ) {
			
			case div_target_error:
				clearTimeout( control_error );
			break;
			
			case div_target_success:
				clearTimeout( control_sucess );
			break;
		
		}
		
		$(document).ready( function() {
			
			$("#" + _id).fadeOut( 'slow' );
			
		});
		
	}

	return {
		initTooltip: initTooltip
	};

})();
