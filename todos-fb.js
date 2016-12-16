var config={databaseURL:"https://todostable-70fca.firebaseio.com"};
firebase.initializeApp(config);
var mytodos=[];
var data={};
var mytodosRef = firebase.database().ref("mytodos");

search();
function addtodo()
{
	 var todo ={} ;
	 todo.name=document.register.uname.value;
	 todo.prior=document.register.pri.value;
	 todo.desc=document.register.desc.value;
	 todo.ddate=document.register.date.value;
	 todo.sstat=document.register.st.value;
    	mytodosRef.push(todo);
			 console.log(todo);
		 return false;
	 
}	 
	mytodosRef.on("value", function(snapshot) 
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
			//console.log(data);
	    }
		show(data);
 
	});
		
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
function search()
{
alert("search work"); 
    
	var mysearch=mytodosRef.child[key];
	mysearch.on("value",function(snapshot)	
		{
			for(var key in data)
	{
		var myName=snapshot.child("name");
		//console.log(data[key].name);
		
		if ( myName === mysearch)
		{
			alert("ok");
		    var myName=data[key];
			console.log(myName);
			
		}
		
		else {
			console.log(data[key].name);
		}
	});
    }
    return false;
}  
function Deletetodo(key)
{
    console.log ("it is called");
    var deletetodoRef=Deleteurl(key);
   
	deletetodoRef.remove();
	show(data);
	
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
	var newurl='https://todostable-70fca.firebaseio.com/mytodos/' + key;
	console.log(newurl);
	return   firebase.database().ref("mytodos/").child(key);
}
function show(data) {
	   search();
    var html = '<table class="table"><thead> <tr><th> NAME</th><th> DESCRIPTION</th><th> DATE</th><th> PRIORITY</th><th> STATUS </th></tr></thead><tbody >';		
    for(var key in data) {
    html += '<tr><td>'+  data[key].name  + '</td> <td>' + data[key].desc +'</td> <td>'+data[key].ddate + '</td> <td>' + data[key].prior +'</td> <td>'+data[key].sstat +'</td> <td>'+
	'  <button  onclick="return Edittodo(\''+key+'\')" >Edit  </button> <button  onclick="return Deletetodo(\''+key+'\')" >Delete</button></td>';
    }
    html += '</tr>	 </tbody> </table>';
		
    document.getElementById('todos').innerHTML = html;
		
	
} 

	
