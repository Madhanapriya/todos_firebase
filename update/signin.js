var UserTodosRef;
 var auth=firebase.auth();

window.onload= function(){
    
  var btnsignin= document.getElementById('btnsignin');
   var btnsignout =document.getElementById('btnsignout');
    var btnsavetodo =document.getElementById('btnsavetodo');
    
    
 btnsignout.addEventListener('click',function()
 {
     firebase.auth().signOut();
 });
    
     btnsavetodo.addEventListener('click',function(){addtodo()}); 
 //  
    
    
 btnsignin.addEventListener('click',function()
 {
 var email=document.getElementById('txtemail').value;
 var pass=document.getElementById('txtpass').value;
 console.log(email);
 console.log(pass);

 var promise=auth.signInWithEmailAndPassword(email,pass);
 promise.catch(function(error){
  console.log(error.message);});
  
   console.log(auth.currentUser);
   
  
 
  });
  firebase.auth().onAuthStateChanged(function(firebaseuser)
 {
   
	 console.log("on auth get changed");
     if (firebaseuser) {
		 console.log(firebaseuser);
         
         UserTodosRef = firebase.database().ref('newtodos/' + auth.currentUser.uid);
       UserTodosRef.on("value", function(snapshot) 
	{
		          data = snapshot.val();
         for (var key in data) 
		 {
            {
		               name = data[key].name ? data[key].name :'';
					   desc= data[key].desc ? data[key].desc :'';
					   prior=data[key].prior ? data[key].prior:'';
                       ddate=data[key].ddate ? data[key].ddate:'';
					   sstat=data[key].sstat ? data[key].sstat:'';
					 
            }
		 }
		show(data);
 
	});
		 
	
  }
  else{
	  console.log("you are not logged");
  }
});
  
 

var mytodos=[];
var data={};


function addtodo()
{    debugger;
 
	 var newTodosRef = UserTodosRef.push();
    
     var todo ={} ;
	 todo.name=document.register.uname.value;
	 todo.prior=document.register.pri.value;
	 todo.desc=document.register.desc.value;
	 todo.ddate=document.register.date.value;
	 todo.sstat=document.register.st.value;
	 
	 todo.pridate=document.register.pri.value+'_'+document.register.date.value;


	 newTodosRef.set(todo);
    
			 console.log(todo);
		 return false;
}
   
	
function update()
{
	var currentkey=document.register.currentkey.value;
    console.log("it is now to update");
	 var updatetodoRef=Deleteurl(currentkey);
	  var todo ={} ;
	 todo.name=document.register.uname.value;
	 todo.prior=document.register.pri.value;
	 todo.desc=document.register.desc.value;
	 todo.ddate=document.register.date.value;
	 todo.sstat=document.register.st.value;
	
	 
	 updatetodoRef.update(todo);	 
	     	console.log("my effort");
		show(data);
    
    return false;
}  

function Deletetodo(key)
{
    alert(key);
	var deletetodoRef=UserTodosRef.child(key);
	console.log(deletetodoRef);
  
	  deletetodoRef.remove();
	
      console.log("it is called");
	//show();
	
		return false;
}
function Edittodo(key){
    //setting form values to object
	console.log("it is now edit");
	 document.register.uname.value=data[key].name;
	 document.register.desc.value=data[key].desc;
	 document.register.pri.value=data[key].prior;
	 document.register.date.value=data[key].ddate;
	 document.register.st.value=data[key].sstat;
	
	 document.register.currentkey.value=key;
	    
    return false;
}
function Deleteurl(key)
{
	var newurl='https://todostable-70fca.firebaseio.com/newtodos/' + key;
	console.log(newurl);
	return  UserTodosRef.child(key);
}

function show(data) {
	
    var html = '<table class="table"><thead> <tr><th> NAME</th><th> DESCRIPTION</th><th> DATE</th><th> PRIORITY</th><th> STATUS</th> </tr></thead><tbody >';		
    for(var key in data) {
    html += '<tr><td>'+  data[key].name  + '</td> <td>' + data[key].desc +'</td> <td>'+data[key].ddate + '</td> <td>' + data[key].prior +'</td> <td>'+data[key].sstat+'</td> <td>'+
	'  <button  onclick="return Edittodo(\''+key+'\')" >Edit  </button> <button  onclick="return Deletetodo(\''+key+'\')" >Delete</button></td>';
    }
    html += '</tr>	 </tbody> </table>';
		
    document.getElementById('todos').innerHTML = html;
	
} 

function searchFB()
{
    namevalue = document.register.uname.value;
	descvalue=document.register.desc.value;
	datevalue=document.register.date.value;
	privalue=document.register.pri.value;
	stvalue=document.register.st.value;
	pridatevalue= document.register.pri.value+'_'+document.register.date.value;
	/* var  namequery = UserTodosRef.orderByChild('name').equalTo(namevalue).limitToFirst(1);
      namequery.on('value', function(snap)
	{
        
        console.log('values');
        alert('here');
        console.log(snap.val());
        myserobj = snap.val();
         if (document.register.uname.value != ""){
        show(myserobj);
        document.register.uname.value=myserobj.name;
		 }
    });
	
	var  descquery=UserTodosRef.orderByChild('desc').equalTo(descvalue).limitToFirst(1);
    descquery.on('value', function(snap)
	{
              

        console.log('values');
        console.log(snap.val());
        myservobj = snap.val();
		if(document.register.desc.value !="")
		{
        show(myservobj);
        document.register.desc.value=myservobj.desc;
		}
	});

    var  datequery= UserTodosRef.orderByChild('ddate').equalTo(datevalue).limitToFirst(1);
     datequery.on('value', function(snap)
	{
		
        console.log('values');
        
        console.log(snap.val());
        myserobj = snap.val();
        if (document.register.date.value != ""){
        show(myserobj);
        document.register.date.value=myserobj.ddate;}
	    
	
	});
	  var  priquery= UserTodosRef.orderByChild('prior').equalTo(privalue).limitToFirst(1);
     priquery.on('value', function(snap)
	{
		
        console.log('values');
        
        console.log(snap.val());
        myserobj = snap.val();
        if (document.register.pri.value != ""){
        show(myserobj);
        document.register.pri.value=myserobj.prior;
	    }
	
	});
	var  stquery= UserTodosRef.orderByChild('sstat').equalTo(stvalue).limitToFirst(1);
     stquery.on('value', function(snap)
	{
		
        console.log('values');
        
        console.log(snap.val());
        myserobj = snap.val();
        if (document.register.st.value != ""){
        show(myserobj);
        document.register.st.value=myserobj.sstat;}
	    
	
	});*/
	console.log(pridatevalue);
	var  pridatequery= UserTodosRef.orderByChild('pridate').equalTo(pridatevalue).limitToFirst(10);
     pridatequery.on('value', function(snap)
	{
			
        console.log('values');
        
        console.log(snap.val());
        myobj = snap.val();
       
           show(myobj);
		
	  
	   
	
	});
    	return false ;
}
};