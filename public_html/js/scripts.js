'use strict';
var app=angular.module("app",[]);
app.controller("Contacto_Controller",function($http,$scope,Service)
{
   $scope.inicio=0;
  $scope.cantidad=20;
  $scope.filtro=null;
  //carga los contactoss
  $scope.cargar= function(){
    Service.todos($scope.inicio,$scope.cantidad,$scope.filtro).then(function(response){
      $scope.contactos=response.data.lista;
      $scope.pages = response.data.total;
      if (response.data.total==0)
      {
        alert ("No se encontraron resultados");

        $scope.filtro=null;
        $scope.cargar();

      }
    });
  };
  //carga la siguiente pagina
  $scope.sigPag = function() {
    if ($scope.inicio < $scope.pages) {
        $scope.inicio=$scope.inicio+$scope.cantidad;

        $scope.cargar();
    }
  };
  //carga la pagina anterior        
  $scope.antPag = function() {
    if ($scope.inicio > 0) {
        $scope.inicio=$scope.inicio-$scope.cantidad;
        $scope.cargar();
    }
  };
  $scope.cargar();
  //borra los contactos de la lista
  $scope.borrar = function (id) {
        Service.eliminar(id).then(function(response)
        {
            $scope.cargar();
            alert("Contacto eliminado");
            

        }, function(response){

            alert("Error en la eliminacion");
       
        });     
       
  };
  $scope.model = {
            "id": 0,
            "nombre": "",
            "apellido": "",
            "alias":"",
            "telefono":"",
            "email":"",
            "direccion":"",
            "fechaCreacion":""

        };
 
 $scope.Guardar=function()
  {
    /*datos que se obtienen del formulario*/
    var data={
      apellido:$scope.nuevoContacto.apellido,
      alias:$scope.nuevoContacto.alias,
      nombre:$scope.nuevoContacto.nombre,
      direccion:$scope.nuevoContacto.direccion,
      telefono:$scope.nuevoContacto.telefono,
      email:$scope.nuevoContacto.email
    }  
    /*se llama a la funcion del post y se obtiene el response del mismo*/
  Service.crear(data).then(function(response)
        {
            $scope.contactos.push(response.data);
            $scope.editar(response.data.id);
            $scope.cargar();
            
            alert("Contacto guardado");
            /*procedemos a llamar  a la pantalla de editar contacto*/
            
        }, function(response){

            alert("El Contacto no pudo ser creado");
        
        });      
};
  $scope.editar=function(id)
  {
    /*recorremos nuestra lista para obtener nuestro registro*/
    for (var i=$scope.contactos.length-1; i>=0; i--) {
   
      if ( $scope.contactos[i].id ==id) 
      {
          $scope.model.id=$scope.contactos[i].id;
          $scope.model.nombre=$scope.contactos[i].nombre;
          $scope.model.apellido=$scope.contactos[i].apellido;
          $scope.model.alias=$scope.contactos[i].alias;
          $scope.model.email=$scope.contactos[i].email;
          $scope.model.telefono=$scope.contactos[i].telefono;
          $scope.model.direccion=$scope.contactos[i].direccion;
          $scope.model.fechacreacion=$scope.contactos[i].fechacreacion;
      }
    }

  };
  $scope.Guardar_Edit=function(id,data)
  {
      Service.actualizar(id,data).then(function(response)
        {
            $scope.cargar();
            alert("Contacto actualizado");
            /*procedemos a llamar a llamar a la pantalla de editar contacto*/
            $scope.editar(response.data.id);
        }, function(response){

            alert("El Contacto no pudo ser actualizado");
        
        });     
  };
});


