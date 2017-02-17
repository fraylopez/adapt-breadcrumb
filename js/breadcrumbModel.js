define([
    'core/js/adapt',
    'backbone'
], function (Adapt, Backbone) {

  var BreadcrumbModel = Backbone.Model.extend({

    defaults: {
      "isEnabled": false,
      "divider": "/",
      "nbUncollapsableCrumbs": 1,
      "nbFixedCrumbs": 0,
      "animate" : false,
	  "models" : []
    }

  });

  return BreadcrumbModel;

});
