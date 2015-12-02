

$(document).ready(function(){

//	var Todo = Backbone.Model.extend({
//		status: function(){return {status:"OKk"}}
//	})
	
	var AppView = Backbone.View.extend({
	      // el - stands for element. Every view has a element associate in with HTML
	      //      content will be rendered.
	      el: '#container',
	      
	      template: _.template("<div class='card-content'><%=who%></div>"),
	      
	      // It's the first function called when this view it's instantiated.
	      initialize: function(){
	        this.render();
	      },
	      // $el - it's a cached jQuery object (el), in which you can use jQuery functions
	      //       to push content. Like the Hello World in this case.
	      render: function(){
	        this.$el.html(this.template({who: "КЭПЧИК"}));
	      }
	    });
	
	var appView = new AppView();
	
	var ve = {};
	
	ve.User = Backbone.Model.extend({});
	ve.UserList = Backbone.Collection.extend({
	      model: ve.User,
	      localStorage: new Store("backbone-todo")
	});
	ve.UserListView = Backbone.View.extend({
	      tagName: 'a',
	      className: 'collection-item',
	      attriburtes: {href : "#!"}, 
	      template: _.template('<%= userName%>'),//_.template($('#user-template').html()),
	      render: function(){
	        this.$el.html(this.template(this.model.toJSON()));
	        return this; // enable chained calls
	      },
	      initialize: function() {
	    	  $('#user-list').append(this.render().el);
	      }
	    });

	
	ve.userList= new ve.UserList();
	
	ve.user= new ve.User();
	
	ve.user.set('userName', 'Aragorn');
	
	ve.userListView = new ve.UserListView({model: ve.user});
	//ve.userListView.render();

	
	ve.ReservationItem = Backbone.Model.extend({
		
		defaults : {
			id : null,
			userId : "",
			visitorId : "",
			start : null,
			end : null,
			status : 'new'
		}
	});
	
	ve.ReservationItemList = Backbone.Collection.extend({
	      model: ve.ReservationItem,
	      localStorage: new Store("backbone-todo")
	});
	
	ve.reservationItemList = new ReservationItemList();
	
	ve.ReservationItemView = Backbone.View.extend({
		tagName: 'a',
	    className: 'collection-item',
	    template: _.template('<%= start%><span class="badge"><%= status></span>'),
	    render: function(){
	        this.$el.html(this.template(this.model.toJSON()));
	        return this; // enable chained calls
	      },
	      
	    
	});
	
	
	
	ve.ReservationListView = Backbone.View.extend({
		el : '#reservation-list',
		initialize: function() {
		  ve.reservationItemList
		}
	});

})	
	