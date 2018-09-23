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

				// Fetching general data
				var email;
				customerFactory.getCustomer(a).then((res) => {
					$scope.stateChangingStart = false;
					$scope.showDetails = true;
					$scope.customerData = res.data;
					email = res.data.email;
					$scope.pageSize = 4;
					console.log("res.data", res.data);

					// Fetching profile photo
					console.log("email:", email);
					customerFactory.getImage(email).then((r) => {
						$scope.customerData.image = window.atob(r.data.image);
						console.log("image response: ", res);
						document.querySelector(".showProfile").src = window.atob(r.data.image);
					}).catch((e) => console.log("error occured: ", e));

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

			var res;
			var reader = new FileReader();
			var blobData;

			$scope.selectDocument = false;
			$scope.showImagePreview = false;

			$scope.getTheFiles = function (files, target) {
				console.log("target now ", target);
				blobData = new Blob(files);
				console.log(files);
				if (!(files[0].type === "text/plain")) {
					target.value = null;
					$scope.selectDocument = false;
					$scope.$digest();
					Notification.warning("Please select plain text file!");
					return;
				} else {
					$scope.selectDocument = true;
					$scope.$digest();
					reader.readAsText(blobData);
					reader.onload = function () {
						res = reader.result;
						$scope.documentData = res;
						var encode = window.btoa(res);
						$scope.showDocument = function () {
							$scope.documentData = res;
						}
					};
				}
			};

			$scope.getTheImage = function (files, target) {
				console.log("target now ", target);
				blobData = new Blob(files);
				if (!(files[0].type === "image/jpeg")) {
					target.value = null;
					Notification.warning("Please select an image (jpeg,jpg,png..)!");
					return;
				} else {
					reader.readAsDataURL(blobData);
					reader.onload = function () {
						$scope.showImagePreview = true;
						res = reader.result;
						var imagePreview = document.querySelector('.imagePreview');
						imagePreview.src = res;
						console.log("target.value : ", target.value);
						$scope.imageModel = res;
						$scope.$digest();
					};
				}
				$scope.clearProfile = function () {
					console.log("clicked clear");
					files, blobData = null;
					$scope.$apply = function () {
						$scope.showImagePreview = false;
						$scope.$digest();
						target.value = null;
					}
				}
			}

			$scope.saveNewCustomer = function () {
				$scope.disableAddCustomer = true;

				var data = {
					firstName: $scope.firstName,
					lastName: $scope.lastName,
					email: $scope.email
				};

				customerFactory.saveCustomer(data).then(function (r) {
					Notification.success({
						message: 'Customer added'
					});
					var documentData = $scope.documentData;
					var imageModel = $scope.imageModel;


					if (!(imageModel === null || undefined)) {
						console.log("since image is not null");
						var image = {
							customerEmail: $scope.email,
							image: window.btoa($scope.imageModel)
						}
						customerFactory.saveImage(image).then(function (res) {
							console.log("success msg for saving image: ", res);
							Notification.success({
								message: 'Image added'
							});
						}).catch(function (e) {
							console.log("Could not add image: ", e);
							Notification.error({
								message: e.data.message
							});
						})
					}
					$state.go("customerList");
				}).catch((function (e) {
					console.log(e);
					Notification.error({
						message: e.data.message+`\nPlease try again!`
					});
					$scope.disableAddCustomer = false;
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