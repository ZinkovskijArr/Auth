
let button = document.getElementById('sub');
let log = document.getElementById('login');
let pass = document.getElementById('pass');


button.onclick = () =>{
    console.log(log.value);
    console.log(pass.value);
    fetch('http://localhost:3000/', {
        method: 'POST',
        mode: 'no-cors',// обход CORS
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login : log.value,
            pass : pass.value
        })
    }).then(response => {
        console.log(response);
        response.json();
    })
    .then(data => {
        console.log("Response");
        console.log(data);
    });
}






