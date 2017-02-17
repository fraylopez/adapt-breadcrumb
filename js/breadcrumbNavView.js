define([
  'core/js/adapt',
  'backbone'
], function(Adapt, Backbone) {

  var BreadcrumbNavView = Backbone.View.extend({

    //tagName: 'button',

    className: 'breadcrumb',

    klass: '',

    events:  {
        'click a': 'onBreadcrumbClick'
    },

    initialize: function (args) {
      this.klass = args.klass;
      this.model.on('change', this.render, this);
      this.render();
    },

    render: function () {
      var data = this.model.toJSON();
      var template = Handlebars.templates['breadcrumbNavView']
      this.$el.addClass(this.klass);
      this.$el.html(template(data));

      return this;
    },

    onBreadcrumbClick: function(event) {
        if(event && event.preventDefault) event.preventDefault();
        var targetId = $(event.currentTarget).attr('data-breadcrumb-id');
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
