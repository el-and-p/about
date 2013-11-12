define(
	[
		'jquery',
		'pubsub'
	],

	function ( $ ) {

		var GridModal;
		var $grid;
		var $modal;
		var $modalCloseBtn;

		return {

			init: function () {
				GridModal = this;
				$modal = $('.js-modal--inline');
				$grid = $('.js-grid');
				$modalCloseBtn = $('.js-modal__close');
				this._initSubscriptions();
				this._initEvents();
			},
			_initSubscriptions: function(){
				$.subscribe('/modal/show', this._positionAndShowModal);
				$.subscribe('/modal/resize', this._positionAndShowModal);
				$.subscribe('/content/ready', this._loadContent);
			},
			_initEvents: function(){
				$modalCloseBtn.on('click', this._closeModal);
			},
			_positionAndShowModal: function(data){
				GridModal._positionModal(data.offset);
				GridModal._setArrow(data.position);
				GridModal._setSpacingForModal();
				GridModal._showModal();
				GridModal._scrollToItem($modal);
				setTimeout(function(){
					GridModal._lazyLoadImages($modal);
				}, 500);
			},
			_loadContent: function( data ){
				var html= data.html;
				$modal.find('.js-modal__body').empty().append(html);
				$.publish('/detail/init');
			},
			_positionModal: function(offset){
				$modal.css('top', offset);
			},
			_setSpacingForModal: function(){
				$modal.css({
					'visibility': 'hidden',
					'display': 'block'
				});
				setTimeout(function(){
					$grid.find('.js-grid__item.is-selected').css({
						'margin-bottom': $modal.outerHeight() + 60
					});
				}, 400);
				$modal.css({
					'visibility': 'visible',
					'display': 'none'
				});
			},
			_setArrow: function(position){
				$modal[0].className = $modal[0].className.replace(/arrow\-(one|two|three)+\-(left|center|right)+/gi, '');
				$modal.addClass(position);
			},
			_closeModal: function(){
				var $currentItem = $grid.find('.js-grid__item.is-selected');
				GridModal._scrollToItem($currentItem);
				$currentItem
					.removeClass('is-selected')
					.attr('style', '');
				$grid.find('.js-grid__item--end').removeClass('js-grid__item--end');
				GridModal._hideModal();
			},
			_showModal: function(){
				$modal.show();
			},
			_hideModal: function(){
				$modal.hide();
			},
			_scrollToItem: function($item){
				$.publish('/scroller/move', [{
					element: $item
				}]);
			},
			_lazyLoadImages: function(){
				var $images = $modal.find('.js-modal__body').find('img');
				if($images.length){
					$.publish('/lazyload/image', [$images]);
				}
			}
		};

	}
);




