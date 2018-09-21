(function(){
	var app=angular.module("app");
	
	app.factory("customerFactory", ["$http","$log",function($http,$log){
		var oCustomerFactory = {};
		
		$log.info("Instantiating factory");		
		
		// get all customers
		oCustomerFactory.getCustomers = function(){
	        return $http({
	            url: "api/customers",
	            method: "GET"
	        });
		};
		
		// get single customer
		oCustomerFactory.getCustomer = function(id){
			return $http({
				url: "api/customers/"+id,
				method: "GET"
			});
		}

		// add new customer
		oCustomerFactory.saveCustomer = function(data){
			return $http({
				url: "api/customers",
				method: "POST",
				data
			});
		}

		// delete a customer
		oCustomerFactory.deleteCustomer = function(id){
			return $http({
				url: "api/customers/" + id,
				method: "DELETE"
			});
		}

		// update a customer
		oCustomerFactory.updateCustomer = function(data){
			return $http({
				url: "api/customers",
				method: "PUT",
				data: data
			});
		}

		// get place
		oCustomerFactory.getPlaces = function(place){
			console.log("entered getplace function");
			return $http({
				url: `//restcountries.eu/rest/v2/name/${place}`,
				method: "GET"
			});
		}

		// get zips
		oCustomerFactory.getZipCodes = function(zip){
			return $http({
				url: `//postalpincode.in/api/pincode/${zip}`,
				method: `GET`
			});
		}

		// post image
		oCustomerFactory.saveImage = function(image){
			return $http({
				url: `api/customers/image`
			})
		}
	    
	    return oCustomerFactory;
		
	}]);
}());