export const setLoggedInUser = user => ({type:'SET_LOGGED_IN_USER', user });

export function attemptLogin(){
	return dispatch => {
		var provider = new window.firebase.auth.GoogleAuthProvider();
		window.firebase.auth().signInWithPopup(provider).then( result => {
			console.log('user logged in')
			// This gives you a Google Access Token, you can use it to access the Google API: result.credential.accessToken;
			// The signed-in user info: result.user;
			// dispatch({ type:'SET_LOGGED_IN_USER', user: result.user });
		}).catch( error => {
			console.warn('error logging in', error);
			// error.code, error.message;
			// The email of the user's account used: error.email;
			// The firebase.auth.AuthCredential type that was used: error.credential;
		});
	}
}


export function logout(){
	return dispatch => {
		window.firebase.auth().signOut().then( s => {
			dispatch( { type:'SET_LOGGED_IN_USER', user: null } );
		});
	}
}