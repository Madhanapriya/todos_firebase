//var config = {databaseURL: "https://todostable-70fca.firebaseio.com"};
var config = {databaseURL : "https://todos-9e7ee.firebaseio.com"};
firebase.initializeApp(config);
var mytodos=[];
var data={};
//var mytodosRef = firebase.database().ref("mytodos");
var mytodosRef = firebase.database().ref("todos");
 
//searchLocal();

//searchFB();

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
// to  get particular object by using this code for task4 
   mytodosRef.orderByChild("name").equalTo('task4').limitToFirst(1).on("child_added", function(snap) 
	{
		console.log(snap.val());
	});

//to get paritcular object from name by using start at and end at way	
	mytodosRef.orderByChild("prior").startAt('low').endAt('low').on("child_added", function(snap) 
	{
		console.log(snap.val());
	});
//to get paticular reference for date which by end date 
	mytodosRef.orderByChild('ddate').endAt('2016-12-08').on("child_added", function(snap) 
	{
		console.log(snap.val());
	});	
//to get paritcular last two objects by using key and first two object means use limittofirst key	
	mytodosRef.orderByKey().limitToFirst(2).on("child_added", function(snap) 
	{
		console.log(snap.val());
	});
// to get ascending	order of value boolean
	
	mytodosRef.orderByValue().limitToLast(2).on("child_added", function(snap) 
	{
		console.log(snap.val());
	});
// to remove a child	
	mytodosRef.orderByKey().on("child_removed", function(snap) 
	{
		console.log("child_removed",snap.val());
		
	});


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


function getCriteria()
{
	debugger;
	
   var search={};
   
   console.log(search);

  if (document.register.uname.value != "")
		   {
			search.key="name";
            search.value= document.register.uname.value ;
            return search;
            
        }
    
    if (document.register.date.value != "")
                
        {
            search.key="date";
            search.value= document.register.date.value ;
            return search;
            
        }
    if (document.register.pri.value != "")
                
        {
            search.key="prior";
            search.value= document.register.pri.value ;
            return search;
            
        }
		 if (document.register.st.value != "")
                
        {
            search.key="sstat";
            search.value= document.register.st.value ;
            return search;
            
        }
   
   
    
}
function searchLocal()  
{
 alert("hello");
 
   
   var search= getCriteria();
    alert("gotocriteris");
    searchflag =false;
   


  
  
  for(var key in data)
	{
		
	       var todo =data[key];
		   
		   
           
			
	
         switch (search.key)
        {
                
        case "name":
           
                if ( search.value.trim() == todo.name.trim())
            {
                alert("ok");
                var searchResult=data[key]; 
                console.log(searchResult);	
                searchflag =true;
            }
		
        break;
                
       case "date":
	   
           if (( todo.ddate !=null) && (search.value.trim() == todo.ddate.trim() ))
             {
            
                  var searchdate=data[key];
			     console.log(searchdate);
			     //searchflag=true;
              }
				
        break; 
        case "prior":
           if(search.value.trim() == todo.prior.trim() )
             {
                alert("pri");
                  var searchResul=data[key];
			     console.log(searchResul);
			    // searchflag=true;
              }
			  break;
		case "sstat":
           if(search.value.trim() == todo.sstat.trim() )
             {
                alert("stat");
                  var searchResul=data[key];
			     console.log(searchResul);
			    searchflag=true;
              }
			  break;
				     	  
				        
    default:
        console.log("error");
                
                
        }
    
	if( searchflag )  break;
	

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
	
    var html = '<table class="table"><thead> <tr><th> NAME</th><th> DESCRIPTION</th><th> DATE</th><th> PRIORITY</th><th> STATUS </th></tr></thead><tbody >';		
    for(var key in data) {
    html += '<tr><td>'+  data[key].name  + '</td> <td>' + data[key].desc +'</td> <td>'+data[key].ddate + '</td> <td>' + data[key].prior +'</td> <td>'+data[key].sstat +'</td> <td>'+
	'  <button  onclick="return Edittodo(\''+key+'\')" >Edit  </button> <button  onclick="return Deletetodo(\''+key+'\')" >Delete</button></td>';
    }
    html += '</tr>	 </tbody> </table>';
		
    document.getElementById('todos').innerHTML = html;
		
	
} 


function searchFB()
{
    
    namevalue = document.register.uname.value ;
    const db = firebase.database();   
 //   const todos = db.child('todos');
    const query = mytodosRef 
                    .orderByChild('name')
                    .equalTo(namevalue)
                    .limitToFirst(1);
    
    query.on('value', snap=>{

        console.log('values');
        alert('here');
        console.log(snap.val());
        mynewobj = snap.val();
        
        show(mynewobj);
        document.register.uname.value=mynewobj.name;
	    document.register.desc.value=mynewobj.desc;
	
        
    });
    
    return false ;
    
}


	
