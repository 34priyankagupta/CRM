(function () {
	var app = angular.module("app");

	app.controller("customerListController", ["$scope", "customerFactory", "Notification", "$document",
		function ($scope, customerFactory, Notification, $document) {
			$scope.pageSize = 6;
			$scope.currentPage = 1;
			$scope.allCustList = true;
			customerFactory.getCustomers().then(function (r) {
				$scope.allCustList = false;
				$scope.result = r;
			}).catch(function (e) {
				Notification.error({
					message: e.data.message,
					delay: 1000
				});
				$scope.result = e;
			})

			$scope.showDetails = false;

			$scope.showCustomerDetails = function (a) {
				console.log("params", a);
				$scope.stateChangingStart = true;
				customerFactory.getCustomer(a).then((res) => {
					$scope.stateChangingStart = false;
					$scope.showDetails = true;
					$scope.customerData = res.data;
					$scope.pageSize = 4;
					console.log("res.data", res.data);
				}).catch((e) => {
					$scope.stateChangingStart = false;
					Notification.error({
						message: e.data.message,
						delay: 1000
					});
					console.log("error occurred", e);
				})

				$document.bind("click", function () {
					console.log("clicking somewhere else");
					$scope.$apply(function () {
						$scope.pageSize = 6;
						$scope.showDetails = false;
					});
					console.log("after digest");
					console.log("$scope.pageSize ", $scope.pageSize);
					console.log("$scope.showDetails ", $scope.showDetails);
				})


			}
		}
	]);


	app.controller("mainRootController", ["$state", function ($state) {
		$state.go("main");
	}]);



	app.controller("addCustomerController", ["$scope", "$state", "customerFactory", "Notification",
		function ($scope, $state, customerFactory, Notification) {

			var formdata = new FormData();
			$scope.getTheFiles = function ($files) {
				console.log($files);
				angular.forEach($files, function (value, key) {
					formdata.append(key, value);
				});
				console.log("Updatedformdata: ", formdata);
			};

			console.log("formdata: ", formdata);

			if (($scope.firstName)) {
				console.log("required first name");
				$scope.disableAddCustomer = true;
			} else {
				$scope.disableAddCustomer = false;
			}

			$scope.saveNewCustomer = function () {
				$scope.disableAddCustomer = true;
				var data = {
					firstName: $scope.firstName,
					lastName: $scope.lastName,
					email: $scope.email
				};
				customerFactory.saveCustomer(data).then(function (r) {
					console.log("image:::", $scope.image);
					Notification.success({
						message: 'Customer added'
					});
					$state.go("customerList");
				}).catch((function (e) {
					console.log(e);
					Notification.error({
						message: e.data.message,
						delay: 1000
					});
				}))

			};

			var place;
			$scope.showCountries = false;
			$scope.foundError = false;
			$scope.errorPlace = false;
			$scope.disableIfPlace = true;
			$scope.placePart = true;
			$scope.ifSomePlace = function () {
				console.log("$scope.selectedPlace ", $scope.place)
				if (($scope.place != null || undefined)) {
					$scope.disableIfPlace = false;
				} else {
					$scope.disableIfPlace = true;
				}
			}

			$scope.allPlaces = function () {
				$scope.disableIfPlace = true;
				place = $scope.place;
				$scope.all = [];
				$scope.all[0] = {};

				customerFactory.getPlaces(place).then(function (r) {
					console.log("asssddd: ", r);
					$scope.place = null;
					if (r.data.message !== "Not Found") {
						if (r != null) {
							$scope.showCountries = true;
							$scope.all = r.data;
							console.log("response for places: ", r);
							$scope.showLabelHidePlacePart = function () {
								if ($scope.selectedPlace != null || undefined) {
									$scope.placePart = false;
									$scope.showCountries = false;
									$scope.placeLabel = true;
								}
							}
							$scope.resetPlace = function () {
								$scope.placePart = true;
								$scope.placeLabel = false;
							}

						} else {
							$scope.all[0].name = e.data.message;
							console.log("all[0].name : " + $scope.all[0].name);
							$scope.errorPlace = true;
						}
					} else {
						$scope.all[0].name = e.data.message;
						console.log("all[0].name : " + $scope.all[0].name);
						$scope.errorPlace = true;
					}

				}).catch((e) => {
					console.log("error", e);
					$scope.showCountries = true;
					$scope.place = null;
					$scope.all[0].name = e.data.message;
					$scope.errorPlace = true;
				});

			}

			var zip = $scope.zip;
			$scope.showZipPostals = false;
			$scope.zipLabel = false;
			$scope.zipPart = true;
			$scope.disableIfZip = true;
			$scope.ifSomeZip = function () {
				if (($scope.zip != null) && (parseInt($scope.zip) == $scope.zip)) {
					$scope.disableIfZip = false;
					console.log(typeof ($scope.zip));
				} else {
					$scope.disableIfZip = true;
					$scope.zip = parseInt($scope.zip);
					alert("provide a number for zip");
				}
			}

			$scope.allZipCode = function () {
				$scope.error = false;
				zip = $scope.zip;
				$scope.allZip = [];
				$scope.allZip[0] = {};
				$scope.disableIfZip = true;
				customerFactory.getZipCodes(zip).then(function (r) {
					$scope.showZipPostals = true;
					$scope.zip = null;
					if ((r != null || undefined) && (r.data.Message !== "No records found")) {
						$scope.allZip = r.data.PostOffice;
						$scope.showLabelHideZipPart = function () {
							if ($scope.selectedZip != null || undefined) {
								$scope.zipPart = false;
								$scope.showZipPostals = false;
								$scope.zipLabel = true;
							}
						}
						$scope.resetZip = function () {
							$scope.zipPart = true;
							$scope.zipLabel = false;
						}
					} else {
						$scope.allZip[0].Name = r.data.Message;
						console.log("else zip, ", r);
						$scope.error = true;
					}
				}).catch((e) => {
					$scope.zip = null;
					$scope.allZip[0].Name = e.data.Message;
					$scope.error = true;
				})

			}

		}


	])

	app.controller("deleteCustomerController", ["customerFactory", "$stateParams", "$scope",
		"$state", "Notification", "deleteCustomerResolver",
		function (customerFactory, $stateParams, $scope, $state, Notification, deleteCustomerResolver) {
			var id = $stateParams.id;
			console.log("deleteCustomerResolver", deleteCustomerResolver);
			if (deleteCustomerResolver) {
				Notification.success({
					message: 'Customer deleted'
				});
				$state.go("customerList");
			} else {
				$state.go("customerList");
			}
		}
	]);

	app.controller("updateCustomerController", ["$state", "customerFactory", "$scope", "detailCustomerResolver", "Notification",
		function ($state, customerFactory, $scope, detailCustomerResolver, Notification) {
			$scope.cust = detailCustomerResolver.data;
			$scope.updateThisCustomer = function () {
				$scope.disableAddCustomer = true;
				var data = {
					id: $scope.cust.id,
					firstName: $scope.cust.firstName,
					lastName: $scope.cust.lastName,
					email: $scope.cust.email
				};
				customerFactory.updateCustomer(data).then((function (r) {
					Notification.success({
						message: 'Customer updated',
						delay: 1000
					});
					$state.go("customerList");
				})).catch(function (e) {
					console.log("error came up");
					Notification.error({
						message: e.data.message,
						delay: 1000
					});
				});

			}

		}
	]);
}())