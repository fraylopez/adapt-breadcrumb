define([
    'core/js/adapt',
    'backbone'
], function (Adapt, Backbone) {

  var BreadcrumbModel = Backbone.Model.extend({

    defaults: {
      "isEnabled": false,
      'models' : [],
      'separator' : '/'
    }

  });

  return BreadcrumbModel;

});
