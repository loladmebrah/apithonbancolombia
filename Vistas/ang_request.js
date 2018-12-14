var app = angular.module('oauthApp', []);

app.controller('oauthCtrl', function($scope, $http) {
	$scope.enviardatos = function(){		
		
		var id = 'b36bc7be-f58c-478f-bc38-a6fa296ff536';
		var secret = 'oQ2qL3eX3cW8cO2iA3dA4jE7qT3dR7cB3rS2mC7qK5qR3qM7yL';
		var catalog_ = 'sandbox';
		var uri = 'http://localhost:4242/getaccesscode'; 
		var scope_ = 'Deposit-account:read:user';

		var form = document.forms[0];

		form.client_id.value = id;
		form.client_secret.value = secret;
		form.catalog.value = catalog_
		form.redirect_uri.value = uri;
		form.scope.value = scope_

		//var url_getaccesscode = 'https://api.us.apiconnect.ibmcloud.com/bancolombiabluemix-dev/'+form.catalog.value+'/hackathon/v1/security/oauth-otp/oauth2/authorize';
		var url_getaccesscode = 'https://api.us.apiconnect.ibmcloud.com/bancolombiabluemix-dev/'+catalog_+'/hackathon/v1/security/oauth-otp/oauth2/authorize';
		var body = {
			client_id:form.client_id.value,
			client_secret:form.client_secret.value,
			catalog:form.catalog.value,
			redirect_uri:form.redirect_uri.value,
			scope:form.scope.value,
			response_type:'code'

			/*client_id: id,
			client_secret: secret,
			catalog: catalog_,
			redirect_uri: uri,
			scope: scope_,
			response_type:'code'*/
		}

		console.log(body);
		
		$http({
			url: '/guardardatos', //Cambiar esta url por la del servidor
			method: "GET",
			params: body
		})
		.then(function(data) {
			form.action = url_getaccesscode;
			form.submit();
		},
		function(data) {
			console.log('error');
		});

		/*var form = document.forms[0];
		var url_getaccesscode = 'https://api.us.apiconnect.ibmcloud.com/bancolombiabluemix-dev/'+form.catalog.value+'/hackathon/v1/security/oauth-otp/oauth2/authorize';
		
		var body = {
			client_id:form.client_id.value,
			client_secret:form.client_secret.value,
			catalog:form.catalog.value,
			redirect_uri:form.redirect_uri.value,
			scope:form.scope.value,
			response_type:'code'
		}
		
		$http({
			url: '/guardardatos', //Cambiar esta url por la del servidor
			method: "GET",
			params: body
		})
		.then(function(data) {
			form.action = url_getaccesscode;
			form.submit();
		},
		function(data) {
			console.log('error');
		});*/
	}
	$scope.enviardatos();
});