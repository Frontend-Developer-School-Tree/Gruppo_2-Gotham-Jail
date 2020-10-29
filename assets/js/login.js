const btn = document.getElementById('logbtn');
const user = document.getElementById('user');
const psw = document.getElementById('psw');
const err = document.querySelector('.error');


function login(e){
	e.preventDefault()	
	
	if ((user.value == 'admin') && (psw.value == 'gotham20')) {
		document.cookie = "logged=yes";
		location.href = "index.html"
	} 
	else {
		err.innerHTML = "Username o Password errati<br><br>"
		
	}  
}

btn.addEventListener('click',login);