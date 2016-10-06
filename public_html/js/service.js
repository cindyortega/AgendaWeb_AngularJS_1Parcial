'use strict';
 
app.factory( 'Service', ['$http', function($http){
 
 return{
    eliminar: function(id)
     {
     	return $http.delete('http://163.172.218.124/pwf/rest/agenda/'+id); 
     },
     todos:function(inicio, cantidad,filtro)
     {
     	if (filtro==null)
     	{
     		return $http.get('http://163.172.218.124/pwf/rest/agenda?inicio='+inicio+'&cantidad='+cantidad); 
     	}
     	else
     	{
     		return $http.get('http://163.172.218.124/pwf/rest/agenda?inicio='+inicio+'&cantidad='+cantidad+'&filtro='+filtro); 
     	}

     },
     actualizar: function(id, data)
     {
     	return $http.put('http://163.172.218.124/pwf/rest/agenda/'+id,data); 
     },
     crear:function(data){
          return $http.post('http://163.172.218.124/pwf/rest/agenda', data); 
            
        },
 }
 
}]);