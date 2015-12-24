

$(document).ready(function(){
	
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
		},
		
		reserve : function() {
			this.save({status: 'reserved'});
		}
	
	});
	
	ve.ReservationItemList = Backbone.Collection.extend({
	      model: ve.ReservationItem,
	      localStorage: new Store("backbone-todo")
	});
	
	ve.reservationItemList = new ve.ReservationItemList();
	
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
		  this.listenTo(ve.reservationItemList, 'add', this.onReservationAdd);
		  ve.reservationItemList.fetch();
		},
		events : {
			"click #reservation-add" : "create"
		},		
		onReservationAdd : function(ri) {
			var riw = new ve.ReservationItemView({model: ri});
			this.$("#reservation-list").append(riw.render().el);
		},
		create : function(e) {
			ve.reservationItemList.create({id: $("#reservation-add").value});
		}
	});
	
	ve.reservationListView = new ve.ReservationListView();
	//var vei = new ve();
})	
	