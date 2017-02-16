define([
  'core/js/adapt',
  'backbone',
  'core/js/adaptCollection',
  './breadcrumbNavView',
  './breadcrumbModel'
], function(Adapt, Backbone, AdaptCollection, BreadcrumbNavView, BreadcrumbModel) {

  var breadcrumbModel = new BreadcrumbModel();
  var breadcrumbNavView;
  var breadcrumbTopView;

  Adapt.on('router:menu', update);
  Adapt.on('router:page', update);

  function update(location) {
    if (!Adapt.config.has('_breadcrumb')) return;
    if (!Adapt.config.get('_breadcrumb')._isEnabled) return;

    Adapt.config.set("_canLoadData", false);

    var currentModel =  Adapt.findById(location.get('_id'));
    /* if (currentModel.get("_type") == 'course'){
      //don't show on course level and remove if exists
      if(breadcrumbNavView)
      {
        breadcrumbNavView.remove();
        breadcrumbNavView = null;
        breadcrumbTopView.remove();
        breadcrumbTopView = null;
  
      }
      return;
    } */

    var breadcrumbModels = new AdaptCollection(currentModel, {url:""});
    var parents = currentModel.getParents();
    if(parents) breadcrumbModels.push(parents.models);

    breadcrumbModel.set('models', breadcrumbModels.toJSON().reverse());
    breadcrumbModel.set('separator', Adapt.config.get('_breadcrumb')._separator);

    if(!breadcrumbNavView || !breadcrumbTopView) setupNavigationView();

  }


  function setupNavigationView () {
    breadcrumbNavView = new BreadcrumbNavView(
      {
        model: breadcrumbModel,
        klass: "breadcrumb-nav"
      });
    breadcrumbNavView.$el.appendTo('.navigation-inner');

    breadcrumbTopView = new BreadcrumbNavView(
      {
        model: breadcrumbModel,
        klass: "breadcrumb-wide breadcrumb-top"
      });
    breadcrumbTopView.$el.appendTo('#wrapper');

  }

});
