
   function login() {
     FB.login(function(response) {
       if (response.authResponse) {
	 FB.api('/me', function(res) {
	   console.log(res.name);
	 });
       } else {
         console.log("fail");
       }
     });
   }
