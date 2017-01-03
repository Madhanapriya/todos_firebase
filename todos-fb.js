var config = {databaseURL: "https://todostable-70fca.firebaseio.com"};

firebase.initializeApp(config);
var mytodos=[];
var data={};
var mytodosRef = firebase.database().ref("mytodos");

 
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
function Deletetodo()
{
    console.log ("it is called");
	 
	var del=mytodosRef.on('child_removed', function(snap) 
	{
		alert("delete");
		
		console.log(snap.val());
		

	});

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
    var db = firebase.database();   
 
    var  query = mytodosRef.orderByChild('name').equalTo(namevalue).limitToFirst(1);
    
    query.on('value', function(snap)
	{

        console.log('values');
        alert('here');
        console.log(snap.val());
        myserobj = snap.val();
        
        show(myserobj);
        document.register.uname.value=myserobj.name;
	    //document.register.desc.value=myserobj.desc;
	
        
    });
    
    return false ;
    
}


    
    

	
