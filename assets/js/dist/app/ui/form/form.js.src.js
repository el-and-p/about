/* app/ui/form/form */

define(
	[
		'jquery'
	],

	function( $ ){

		var Form;

		return {

			init: function () {
				Form = this;
				Form._initEvents();
			},

			_initEvents: function () {
				var $form = $( '.js-form' );
				$form.on('blur', '[required]', this._processBlur );
				$form.find( '.js-submit' ).on( 'click', this._processSubmit );
			},

			_processSubmit: function ( event ) {
				event.preventDefault();
				var $thisBtn = $(this);
				var $parentForm = $thisBtn.closest('form');
				if ( !Form._checkIfFormValid( $parentForm ) ) {
					return;
				}

				$thisBtn.attr('disabled', '');
				var $modal = $parentForm.find('.js-form__modal');

				if($parentForm.closest('#js-form-mailchimp').length){
					Form._processMailchimp( $parentForm, $modal );
					return;
				}

				Form._processEnquiry( $parentForm, $modal );

			},

			_processMailchimp: function( $form, $modal ){
				var data = Form._createMailChimpData();
				Form._postForm(
					$form.attr('action'),
					data,
					//Success Callback
					function ( response ) {
						if(response === 'success') {
							Form._showModalMessage( $modal, 'Thanks for subscribing!', $form );
						} else {
							Form._showModalMessage( $modal, 'Oops! There was a problem adding you to our list! Please try again later', $form );
						}
					},
					//Error Callback
					function ( response ) {
						var error = response.responseText;
						var mailchimpResponse = $.parseJSON( error );
						var message = 'Oops! There was a problem adding you to our list! Please try again later';
						console.error('Mailchimp Subscription Error:', response.responseText);
						if( mailchimpResponse && mailchimpResponse.error ) {
							message = mailchimpResponse.error;
						}
						Form._showModalMessage( $modal, message, $form );
					});
			},

			_createMailChimpData: function(){
				var data = {};
				var name = $('#subscribe-name')[0].value;
				var nameArray = name.split( ' ' );
				data.firstname = nameArray[0];
				nameArray.shift();
				data.lastname = nameArray.join(' ');
				data.email = $('#subscribe-email')[0].value;
				return data;
			},

			_processEnquiry: function( $form, $modal ){
				var data = Form._createEnquiryData();
				Form._postForm(
					$form.attr('action'),
					data,
					//Success Callback
					function ( response ) {
						Form._showModalMessage( $modal, 'Thanks for your enquiry. We will get back to you as soon as possible.', $form );
					},
					//Error Callback
					function ( response ) {
						Form._showModalMessage( $modal, 'Ooops! There was a problem sending your message. Please try again later.', $form );
					});
			},

			_createEnquiryData: function(){
				var data = {};
				data.name = $('#contact-name')[0].value;
				data.email = $('#contact-email')[0].value;
				data.message = $('#contact-message')[0].value;
				return data;
			},

			_postForm: function( url, data, successCallback, errorCallback ){
				$.ajax({
					url:url,
					type: 'POST',
					data: data
				})
				.done( successCallback )
				.fail( errorCallback );
			},

			_showModalMessage: function( $modal, message, $form ){
				if(Modernizr.csstransitions) {
					var $message = $modal.find('.js-modal__message');
					$message.text(message);
					$modal.css('display', 'block');
					$modal.addClass('is-fading-in');
					setTimeout(function(){
						$modal.removeClass('is-fading-in').addClass('is-fading-out');
						$form.find('.js-submit').removeAttr('disabled');
						setTimeout(function(){
							$modal.hide();
							$modal.removeClass('is-fading-out');
						}, 3000);
					}, 4000);
				} else {
					$modal.show();
					setTimeout(function(){
						$modal.hide();
					}, 4000);
				}

			},

			_processBlur: function( e ) {
				var $thisInput = $( this );
				if ( !Form._checkInputValidity( $thisInput ) ) {
					Form._showHideError( $thisInput, '' );
				} else {
					Form._showHideError( $thisInput, 'hide' );
				}
			},

			_checkIfFormValid: function ( $form ) {
				var isValid = true;
				$form.find( '[required]' ).each( function () {
					var $thisInput = $( this );
					if ( !Form._checkInputValidity( $thisInput ) ) {
						Form._showHideError( $thisInput, '' );
						isValid = false;
					} else {
						Form._showHideError( $thisInput, 'hide' );
					}
				} );
				return isValid;
			},

			_checkInputValidity: function( $thisInput ){
					var value = $thisInput[0].value;
					var regex = $thisInput.attr( 'pattern' );
					return ( value === '' ||  regex  && !( new RegExp( regex ).test( value ) ) ) ? false : true ;
			},

			_showHideError: function ( $input, action ) {
				var hiddenClassAction = 'remove';
				var visibleClassAction = 'add';
				var $error = $input.next( '.js-error' );

				if ( action === 'hide' ) {
					hiddenClassAction = 'add';
					visibleClassAction = 'remove';
				}

				$input[visibleClassAction + 'Class']( 'has-error' );
				$error[hiddenClassAction + 'Class']( 'is-hidden' )[visibleClassAction + 'Class']( 'is-visible' );
			}

		};

	}
);
