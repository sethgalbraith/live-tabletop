LT.createLogin = function(){
    var loginButton = new LT.element('div', { class : 'login'}, LT.pageBar);
	loginText = document.createTextNode("Login");
	logoutText = document.createTextNode("Logout");
    loginButton.appendChild(loginText);
    LT.loginDiv = new LT.element('div', { id : 'loginDiv' }, LT.pageBar);
    loginButton.onclick = function(){
      LT.pageBar.removeChild(loginButton);
      LT.loginDiv.style.visibility = 'visible';
    }
      var loginForm = new LT.element('form', { id : 'loginForm', 
	    style : 'float: right;'}, LT.loginDiv);
      var loginUsername = new LT.element('input', { style : 'border: 1px solid #CCC;',
        id : 'username', size : 10, value : 'username' }, loginForm);
	  loginUsername.onfocus = function(){ emptyMe(this, 'username') };
      var loginPassword = new LT.element('input', { style : 'border: 1px solid #CCC;',
        id : 'password', size : 10, value : 'password', type : 'password' }, loginForm);
	  loginPassword.onfocus = function(){ emptyMe(this, 'password') };
      var loginSubmit = new LT.element('input', { type : 'button', style : 'cursor: pointer', 
        id : 'loginSubmit', size : 8, value : 'Login' }, loginForm);
      loginSubmit.onclick = function(){
        var loginRoutine = LT.ajaxRequest("POST", "php/login.php",
          { username : loginUsername.value, password : loginPassword.value});
		var userElement = loginRoutine.responseXML.getElementsByTagName('user')[0];
		if(userElement){
		  LT.username = userElement.getAttribute('name');
		  LT.userID = userElement.getAttribute('id');
		  LT.userColor = userElement.getAttribute('color');
		  LT.userPermissions = userElement.getAttribute('permissions');
          LT.loginDiv.removeChild(loginForm);
          loggedIn = LT.element('div', { id : 'loggedIn' }, LT.loginDiv );
          LT.tablePanel = new Panel( 'User Options', LT.username + "'s " + 'options', LT.loginDiv, 
		    420, 170, 175, 300);
		}else{
		  alert('Incorrect username or password.')
		}
	  }
}