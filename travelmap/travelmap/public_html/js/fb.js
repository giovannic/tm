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

function friends_fbloc() {
  var fr_fbloc = FB.api('me?fields=friends.limit(10).fields(locations.limit(10))');
}

function me_fbloc(){
	var me_fbloc = FB.api('me?fields=id,name,likes.limit(10).fields(photos.limit(10).fields(place))');
}

function music_fbloc(){
	var mus_fbloc = FB.api('me?fields=music.limit(10).fields(photos.fields(place))');
}