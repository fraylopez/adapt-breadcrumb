define([
  'core/js/adapt',
  'backbone',
  'core/js/adaptCollection',
  './breadcrumbNavView',
  './breadcrumbModel',
  '../lib/rcrumbs/jquery.rcrumbs_amd'
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
    if (currentModel.get("_type") == 'course'){
      //don't show on course level and remove if exists
      if(breadcrumbTopView)
      {
        breadcrumbTopView.remove();
        breadcrumbTopView = null;
  
      }
       return;
    } 

    var breadcrumbModels = new AdaptCollection(currentModel, {url:""});
    var parents = currentModel.getParents();
    if(parents) breadcrumbModels.push(parents.models);
    
    breadcrumbModel.set('isEnabled', Adapt.config.get('_breadcrumb')._isEnabled);
    breadcrumbModel.set('divider', Adapt.config.get('_breadcrumb')._divider);
    breadcrumbModel.set('nbUncollapsableCrumbs', Adapt.config.get('_breadcrumb')._nbUncollapsableCrumbs);
    breadcrumbModel.set('nbFixedCrumbs', Adapt.config.get('_breadcrumb')._nbFixedCrumbs);
    breadcrumbModel.set('animate', Adapt.config.get('_breadcrumb')._animate);
	breadcrumbModel.set('models', breadcrumbModels.toJSON().reverse());

    if(!breadcrumbTopView) setupNavigationView();
	
	$("#breadcrumbs").rcrumbs(
		{
			nbUncollapsableCrumbs: breadcrumbModel.get('nbUncollapsableCrumbs'),
			nbFixedCrumbs: breadcrumbModel.get('nbFixedCrumbs'),
			animation: {
				activated: breadcrumbModel.get('animate'),
			}
		});
  }


  function setupNavigationView () {
    /* breadcrumbNavView = new BreadcrumbNavView(
      {
        model: breadcrumbModel,
        klass: "breadcrumb-nav"
      });
    breadcrumbNavView.$el.appendTo('.navigation-inner');  */

    breadcrumbTopView = new BreadcrumbNavView(
      {
        model: breadcrumbModel,
        klass: "breadcrumb-wide breadcrumb-top"
      });
    // breadcrumbTopView.$el.appendTo('#wrapper');
    breadcrumbTopView.$el.insertAfter($('.navigation'));
	
	
  }

});
