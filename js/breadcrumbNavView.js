define([
  'core/js/adapt',
  'backbone'
], function(Adapt, Backbone) {

  var BreadcrumbNavView = Backbone.View.extend({

    //tagName: 'button',

    className: 'breadcrumb',

    klass: '',

    events:  {
        'click .breadcrumb-item': 'onBreadcrumbClick'
    },

    initialize: function (args) {
      this.klass = args.klass;
      //this.listenTo(Adapt, 'remove', this.remove);
      this.model.on('change', this.render, this);
      Adapt.on('device:resize', this.render, this);
      this.render();
    },

    render: function () {
      //this.$el.html (this.model.get('_breadcrumb'));
      var data = this.model.toJSON();
      var template = Handlebars.templates['breadcrumbNavView']
      this.$el.addClass(this.klass);
      this.$el.html(template(data));

      return this;
    },

    onBreadcrumbClick: function(event) {
        if(event && event.preventDefault) event.preventDefault();
        var targetId = $(event.currentTarget).attr('data-breadcrumb-id');
        //var $currentComponent = $(currentComponentSelector);
        //Adapt.navigateTo($currentComponent, { duration:400 });
        var type = this.getModelTypeById(targetId);
        if(!type) return; //shouldn't happen

        if(type != 'course')
        {
          Backbone.history.navigate('#/id/' + targetId, {trigger: true, replace: false});
        }
        else {
          Adapt.trigger('navigation:homeButton');
        }

    },

    getModelTypeById : function(id)
    {
      var models = this.model.get("models");
      var type = null;
      _.each(models, function(item){
          if(item._id == id) type =  item._type;
        });
      return type;
    }


  });

  return BreadcrumbNavView;

});
