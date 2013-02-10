function login() {
     FB.login(function(response) {
       if (response.authResponse) {
	 FB.api('/me', function(res) {
	   console.log(res.name);
	 get_fbloc();
	 });
       } else {
         console.log("fail");
       }
     });
}

function get_fbloc() {
  var locations = FB.api('me?fields=id,name,photos.fields(place)');
}
