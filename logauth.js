
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA0wmhbPB5BUgb0uVmXm5V9LF5xkPwQcTU",
    authDomain: "todostable-70fca.firebaseapp.com",
    databaseURL: "https://todostable-70fca.firebaseio.com",
    storageBucket: "todostable-70fca.appspot.com",
    messagingSenderId: "946094622637"
  };
  firebase.initializeApp(config);
var auth=firebase.auth();
var firedb=firebase.database();

//localStorage.setItem("auth",JSON.stringify(auth));
//localStorage.setItem("firedb",JSON.stringify(firedb));
  
	var txtemail=document.getElementById('txtemail');
	var txtpass=document.getElementById('txtpass');
	var btnLogin=document.getElementById('btnLogin');
	var btnSignUp=document.getElementById('btnSignUp');
	var btnLogOut=document.getElementById('btnLogOut');
	

btnLogin.addEventListener('click',function()
{ 
	var email=txtemail.value;
	var pass=txtpass.value;
	
	
	var promise=auth.signInWithEmailAndPassword(email, pass);
	promise.catch(function(error)  {
		
  console.log(error.message);});
    
    
 });

  btnSignUp.addEventListener('click',function()
{ 
alert("ok");
	var email=txtemail.value;
	var pass=txtpass.value;
	var auth=firebase.auth();
	var promise=auth.createUserWithEmailAndPassword(email, pass);
	promise.catch(function(error) { 
	  console.log(error.message);});
 });
    
firebase.auth().onAuthStateChanged(function(firebaseUser)  
 {
console.log("inside auth state changes");
    if (firebaseUser) {
    console.log(firebaseUser);  
        sessionStorage.setItem('currentUserId',firebase.auth().currentUser.uid);
        console.log('session id'+sessionStorage.getItem('currentUserId'));
        window.location = 'index-fb.html'; //After successful login, user will be redirected to home.html
  }
  else{
	  console.log("you are not logged");
  }
});
 

