var config={databaseURL:"https://todos-a7ed3.firebaseio.com"};

firebase.initializeApp(config);

var playersRef = firebase.database().ref("players");

playersRef.set({
   john: {
      number: 1,
      age: 30
   },
	
   Amanda: {
      number: 2,
      age: 20
   }
});
var johnRef=firebase.database().ref("players/john");
johnRef.update({"number":70});
playersRef.push({
	name:"anitha",
	age:20,
	number:10
});
playersRef.push({
	name:"naren",
	age:30,
	number:20
});

function toggleplayers(anithaAgeRef,KYMj5woBv9dNSlnvvtu){
	
anithaAgeRef.transaction (function(currentAge)
{
	
	if(currentAge)
	{
	if(currentAge.players && currentAge.players[KYMj5woBv9dNSlnvvtu])
	 {
		currentAge.playersRef--;
        currentAge.players[KYMj5woBv9dNSlnvvtu] = null;
      } 
	  else 
	  {
        currentAge.players++;
        if (!currentAge.players) {
          currentAge.players = {};
        }
        currentAge.players[KYMj5woBv9dNSlnvvtu] = true;
      }
	}
	return currentAge+1;
});
}
/*change the age value by using transaction function
var anithaAgeRef = firebase.database().ref("players/-KYMdcmqaBq-TmTN_2a9");
anithaAgeRef.transaction(function(currentAge) {
   return currentAge + 1;
});*/

playersRef.on('value',function(snapshot){
	console.log(snapshot.val());
	
});
/*
playersRef.on("child_added",function(data,prevChildKey)
{
	var newPlayers=data.val();
	console.log("name"  + newPlayers.name);
	console.log("age" + newPlayers.age);
	console.log("number" + newPlayers.number);
	console.log("previous" +prevChildKey);
});*/