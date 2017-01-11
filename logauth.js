var config = {databaseURL: "https://authenticate-1d688.firebaseio.com/"};
firebase.initializeApp(config);

function auth()
{  

	var txtemail=document.getElementById('txtemail');
	var txtpass=document.getElementById('txtpass');
	var btnLogin=document.getElementById('btnLogin');
	var btnSignUp=document.getElementById('btnSignUp');
	var btnLogOut=document.getElementById('btnLogOut');
	

btnLogin.addEventListener('click',function()
{ 
	var email=txtemail.value;
	var pass=txtpass.value;
	var auth=firebase.auth();
	var promise=auth.signInWithEmailAndPassword(email, pass);
	promise.catch(function(error)  {
		var errorCode = error.code;
      var errorMessage = error.message;
     if (errorCode == 'auth/weak-password')
	  {
    alert('The password is too weak.');
  } 
  else 
  {
    alert(errorMessage);
  }
  console.log(error);});
 });
  btnSignUp.addEventListener('click',function()
{ 
alert("ok");
	var email=txtemail.value;
	var pass=txtpass.value;
	var auth=firebase.auth();
	var promise=auth.createUserWithEmailAndPassword(email, pass);
	promise.catch(function(error)  
	{
		var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode == 'auth/weak-password')
	  {
    alert('The password is too weak.');
  } else 
  {
    alert(errorMessage);
  }
  console.log(error);
});
 });
firebase.auth().onAuthStateChanged(firebaseuser,function()
 {
     if (firebaseuser) {
    console.log(firebaseuser);
  }
  else{
	  console.log("you are not logged");
  }
});
 
return false
}
