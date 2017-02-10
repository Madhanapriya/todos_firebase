angular.module('Demoapp',[])
 .controller('democontroller',function($scope){
    $scope.customers=[{name:'Asha',City:'Chennai',age:22},
                      {name:'Nimmi',City:'Bangalore',age:24},
                      {name:'Shraradha',City:'Kolkatta',age:26},
                      {name:'kavitha',City:'Bangalore',age:28},
                      {name:'Fathima',City:'Delhi',age:30}]
    
});