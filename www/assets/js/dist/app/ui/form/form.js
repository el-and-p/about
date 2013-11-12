define(["jquery"],function(t){var i;return{init:function(){i=this,i._initEvents()},_initEvents:function(){var i=t(".js-form");i.on("blur","[required]",this._processBlur),i.find(".js-submit").on("click",this._processSubmit)},_processSubmit:function(e){e.preventDefault();var n=t(this),o=n.closest("form");if(i._checkIfFormValid(o)){n.attr("disabled","");var s=o.find(".js-form__modal");return o.closest("#js-form-mailchimp").length?(i._processMailchimp(o,s),void 0):(i._processEnquiry(o,s),void 0)}},_processMailchimp:function(e,n){var o=i._createMailChimpData();i._postForm(e.attr("action"),o,function(t){"success"===t?i._showModalMessage(n,"Thanks for subscribing!",e):i._showModalMessage(n,"Oops! There was a problem adding you to our list! Please try again later",e)},function(o){var s=o.responseText,r=t.parseJSON(s),a="Oops! There was a problem adding you to our list! Please try again later";console.error("Mailchimp Subscription Error:",o.responseText),r&&r.error&&(a=r.error),i._showModalMessage(n,a,e)})},_createMailChimpData:function(){var i={},e=t("#subscribe-name")[0].value,n=e.split(" ");return i.firstname=n[0],n.shift(),i.lastname=n.join(" "),i.email=t("#subscribe-email")[0].value,i},_processEnquiry:function(t,e){var n=i._createEnquiryData();i._postForm(t.attr("action"),n,function(){i._showModalMessage(e,"Thanks for your enquiry. We will get back to you as soon as possible.",t)},function(){i._showModalMessage(e,"Ooops! There was a problem sending your message. Please try again later.",t)})},_createEnquiryData:function(){var i={};return i.name=t("#contact-name")[0].value,i.email=t("#contact-email")[0].value,i.message=t("#contact-message")[0].value,i},_postForm:function(i,e,n,o){t.ajax({url:i,type:"POST",data:e}).done(n).fail(o)},_showModalMessage:function(t,i,e){if(Modernizr.csstransitions){var n=t.find(".js-modal__message");n.text(i),t.css("display","block"),t.addClass("is-fading-in"),setTimeout(function(){t.removeClass("is-fading-in").addClass("is-fading-out"),e.find(".js-submit").removeAttr("disabled"),setTimeout(function(){t.hide(),t.removeClass("is-fading-out")},3e3)},4e3)}else t.show(),setTimeout(function(){t.hide()},4e3)},_processBlur:function(){var e=t(this);i._checkInputValidity(e)?i._showHideError(e,"hide"):i._showHideError(e,"")},_checkIfFormValid:function(e){var n=!0;return e.find("[required]").each(function(){var e=t(this);i._checkInputValidity(e)?i._showHideError(e,"hide"):(i._showHideError(e,""),n=!1)}),n},_checkInputValidity:function(t){var i=t[0].value,e=t.attr("pattern");return""===i||e&&!new RegExp(e).test(i)?!1:!0},_showHideError:function(t,i){var e="remove",n="add",o=t.next(".js-error");"hide"===i&&(e="add",n="remove"),t[n+"Class"]("has-error"),o[e+"Class"]("is-hidden")[n+"Class"]("is-visible")}}});
//# sourceMappingURL=form.js.map