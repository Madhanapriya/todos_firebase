var config={databaseURL:"https://todos-a7ed3.firebaseio.com"};

firebase.initializeApp(config);

var playersRef=firebase.database().ref('players');
var fplayerRef = firebase.database().ref("players/").limitToFirst(1);

var lplayerRef = firebase.database().ref('players/').limitToLast(1);

fplayerRef.on("value", function(data) {
   console.log(data.val());

});

lplayerRef.on("value", function(data) {
   console.log(data.val());

});



/*

var ratingRef=firebase.database().ref("ratings");


ratingRef.orderByValue().on("value", function(data) 
{
 data.forEach(function(data)
 
   {
      console.log("The " + data.key + " rating is " + data.val());
   });
 });
var playersRef = firebase.database().ref("players/");
playersRef.set({
   John: {
      number: 1,
      age: 30
   },
	
   Amanda: {
      number: 2,
      age: 20
   }
});
var johnRef = firebase.database().ref("players/John");
johnRef.update({
   "number": 10
});
playersRef.push({
   name: "anitha",
   number: 1,
   age: 30
});

playersRef.push({
   name: "naren",
   number: 2,
   age: 20
});
playersRef.orderByKey().on("child_added", function(data) {
   console.log(data.key);
});
playersRef.orderByChild("number").on("child_added", function(data)
{
	console.log(data.val().number);
});
playersRef.on("value", function(data) {
   console.log(data.val());
}, function (error) {
   console.log("Error: " + error.code);
});
playersRef.off("value");
playersRef.on("child_removed",function(data)
{
	var delPlayers=data.val();
	console.log("deleted playername"  + delPlayers.name);
	console.log("age" + delPlayers.age);
	console.log("number" + delPlayers.number);
	
});
//change the age value by using transaction function
var anithaAgeRef = firebase.database().ref("players/-KYNKLXYLTZxetjShvXv).child('age');
anithaAgeRef.transaction(function(currentAge) {
   return currentAge + 1;
});

playersRef.on('value',function(snapshot){
	console.log(snapshot.val());
	
});*/
