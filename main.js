

	   //$('#user-email').on('input',function() {
	  // var email = $('#user-email').val()
	  // var message = 'Welcome Back, ' + email;
	  // $('.welcome-message').text(message);
     //});

//food app controller
	 var foodieApp = angular.module('foodieApp',['ngRoute']);    //routing used here
	 foodieApp.config(function ($routeProvider) {
	$routeProvider
	.when('/',{                                       //route provider condition
		templateUrl: 'pages/login.html',           //addresses
		controller: 'loginController'
	})
	.when('/home',{
		templateUrl: 'pages/main.html',
		controller: 'mainController'
	})
	.when('/restaurant/:id', {
		templateUrl: 'pages/restaurant.html',
		controller: 'restaurantController'
	})
})

//restaurant controller
	foodieApp.controller('restaurantController',function($scope,$routeParams,$http) {
$scope.restaurantId = $routeParams.id;
var restaurants = [{                                        //array of objects used for  details of restaurants
	name: 'Farzi Cafe',
	address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
	location: 'Connaught Place',
	category: 'Casual Dining, Bar',
	vote: '4.2',
	id : 1,
	cuisines: 'Modern Indian',
	cost: '2200',
	hours: '12 Noon to 1 AM (Mon-Sun)',
	bestDish: {
	name: 'hamburgers',
	image: 'http://i0.wallpaperscraft.com/image/fast_food_hamburgers_jotas_mastiffs_ketchup_44609_300x188.jpg'
},
	image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
},

{
	name: 'Local',
	address: '11, ken marg , sanida house ,New Delhi',
	location: 'connaught place',
	category: 'Casual Dining',
	vote: '4.3',
		id : 2,
	cuisines: 'North Indian',
	cost: '1300',
	hours: '12 Noon to 3 PM, 6:30 PM to 11 PM (Mon-Sun) ',
	bestDish: {
	name: 'Corn Pizza',
	image: 'http://i0.wallpaperscraft.com/image/food_delicious_set_many_different_88293_300x188.jpg'
},
	image: 'http://i2.wallpaperscraft.com/image/food_sweet_cake_macaroon_83045_300x188.jpg'
},
{
	name: 'Diggin',
	address: 'Backside, SCO 1A, Madhya Marg, Sector 7, Chandigarh',
	location: 'Sector 7, Chandigarh',
	category: 'Fine Dining',
		cuisines: 'Modern Indian',
	vote: '4.3',
	id : 3,
		cost: '2200',
		hours: '11:30 AM to 11:30 PM (Mon-Sun) ',
		bestDish: {
		name: 'Onion rings',
		image: 'http://i0.wallpaperscraft.com/image/onion_rings_fast_food_potato_110647_300x188.jpg'
	},
		image: 'http://i2.wallpaperscraft.com/image/food_table_cafe_snack_sauce_coca_43756_300x188.jpg'
	},
	{
		name: 'Too Indian',
		address: 'Booth 11, Sector 8, Chandigarh',
		location: 'Sector 8, Chandigarh',
     category: 'fine dining',
		vote: '4.6',
			id : 4,
		cuisines: 'indian',
		cost: '600',
		hours: '10 AM to 10:30 PM (Mon-Fri),10 AM to 11 PM (Sat-Sun)',
		bestDish: {
		name: 'hamburgers',
		image: 'http://i0.wallpaperscraft.com/image/fast_food_hamburgers_jotas_mastiffs_ketchup_44609_300x188.jpg'
	},
		image: 'http://i2.wallpaperscraft.com/image/food_macro_white_bread_delicious_77721_300x188.jpg'
	},
	{
		name: 'Pa Pa Ya',
		address: 'near market, Sector 22, Chandigarh',
		location: 'Sector 22, Chandigarh',
		category: 'Quick Bites',
		vote: '4.4',
			id : 5,
		cuisines: 'Burger, Fast Food, Beverages',
		cost: '1200',
		cuisines: 'italian',
		hours: '12 Noon to 11 PM (Mon-Sun) ',
		bestDish: {
		name: 'hamburgers',
		image: 'http://i0.wallpaperscraft.com/image/hamburger_meat_vegetables_bun_fast_food_106902_300x188.jpg'
	},
		image: 'http://i0.wallpaperscraft.com/image/food_kebab_meat_tomato_sauce_vegetables_cucumbers_tomatoes_skewers_71101_300x188.jpg'
	},

	]
	$scope.restaurant = restaurants[$routeParams.id - 1];
	$scope.getIngredients = function(url) {
// Do something
var data = '{"inputs":[{"data":{"image":{"url":"' + url + '"}}}]}'
$http({                                                                        // used to call clarifai
		'method': 'POST',
		'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
		'headers': {
				'Authorization': 'Key f5534695ec9d4ed6a0a90a974e637dfd',
				'Content-Type': 'application/json'
		},


// 		success: function (response) {
// 				var ingredients = response.outputs[0].data.concepts;
// 				var list = '';
// 				for (var i =0;i < ingredients.length;i++) {
// 						list += '<div class="ingredient">' + ingredients[i].name + '</div>'
// 				}
// 				$('.ingredients').html(list);
// 		},
// error: function (xhr) {
// 				console.log(xhr);
// 		}
// })
'data': data
}).then(function (response) {
	var ingredients = response.data.outputs[0].data.concepts;
	for (var i =0;i < ingredients.length;i++) {
	$scope.ingredients.push(ingredients[i].name);
	}
		}, function (xhr) {
				console.log(xhr);
			})

}
$scope.ingredients = [];              //array
		$scope.probabilityvalue=[];

		$scope.toDoList = function(){           //to do list for getting ingredients


			 var todoarray = angular.copy($scope.ingredients);

				$scope.todoList = [];
				for(var i = 0 ; i<todoarray.length; i++){
				  $scope.todoList.push({todoText:todoarray[i], done:false});
				}

			   $scope.remove = function() {                     // for removing the ingredients which are not required
			       var oldList = $scope.todoList;
			       $scope.todoList = [];
			       angular.forEach(oldList, function(x) {
			           if (!x.done) $scope.todoList.push(x);
			       });
			   };

			   $scope.done = function() {

			   		console.log("hhhh");
			   	//	donee=!donee;
			   		//$.text-decoration: overline;

			   }



		}

	});



	 foodieApp.controller('loginController',function($scope,$location) {           //controller for login page
		 $scope.goToHome = function() {
		 		//console.log('Do Something')
				$location.url('home')
		 	}
})


	 foodieApp.controller('mainController',function($scope) {          //controller for main restaurant data
			$scope.restaurants = [{                                       //array of objects used for  details of restaurants
				name: 'Farzi Cafe',
				address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
				location: 'Connaught Place',
				category: 'Casual Dining, Bar',
				vote: '4.2',
					id : 1,
				cuisines: 'Modern Indian',
				cost: '2200',
				hours: '12 Noon to 1 AM (Mon-Sun)',
				image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
			},

			{
				name: 'Local',
				address: '11, ken marg , sanida house ,New Delhi',
				location: 'connaught place',
				category: 'Casual Dining',
				vote: '4.3',
					id : 2,
				cuisines: 'North Indian',
				cost: '1300',
				hours: '12 Noon to 3 PM, 6:30 PM to 11 PM (Mon-Sun) ',
				image: 'http://i2.wallpaperscraft.com/image/food_sweet_cake_macaroon_83045_300x188.jpg'
			},
			{
					name: 'Diggin',
					address: 'Backside, SCO 1A, Madhya Marg, Sector 7, Chandigarh',
					location: 'Sector 7, Chandigarh',
					category: 'Fine Dining',
					vote: '4.3',
						id : 3,
					cuisines: 'Italian',
					cost: '2200',
					hours: '11:30 AM to 11:30 PM (Mon-Sun) ',
					image: 'http://i2.wallpaperscraft.com/image/food_table_cafe_snack_sauce_coca_43756_300x188.jpg'
				},
				{
					name: 'Too Indian',
					address: 'Booth 11, Sector 8, Chandigarh',
					location: 'Sector 8, Chandigarh',

					vote: '4.6',
						id : 4,
					cuisines: 'indian',
					cost: '600',
					hours: '10 AM to 10:30 PM (Mon-Fri),10 AM to 11 PM (Sat-Sun)',
					image: 'http://i2.wallpaperscraft.com/image/food_macro_white_bread_delicious_77721_300x188.jpg'
				},
				{
					name: 'Pa Pa Ya',
					address: 'near market, Sector 22, Chandigarh',
					location: 'Sector 22, Chandigarh',
					category: 'Quick Bites',
					vote: '4.4',
						id : 5,
					cuisines: 'Burger, Fast Food, Beverages',
					cost: '1200',
					hours: '12 Noon to 11 PM (Mon-Sun) ',
					image: 'http://i0.wallpaperscraft.com/image/food_kebab_meat_tomato_sauce_vegetables_cucumbers_tomatoes_skewers_71101_300x188.jpg'
				},




]

	 })