// async function register(){
//     let response=await fetch('http://localhost:8000/employees/register')
//     let data=await response.json();
//     console.log(data);
// }
// register()

let registerButton = document.getElementById('register');

registerButton.addEventListener('click',()=>{
    let rootEle = document.getElementById('root');
    rootEle.innerHTML="";
    let nameEle = document.createElement('input');
    nameEle.setAttribute('type','text');
    nameEle.setAttribute('name','name');
    nameEle.setAttribute('placeholder','Enter your name');
    nameEle.setAttribute('id','name');

    let emailEle = document.createElement('input');
    emailEle.setAttribute('type','email');
    emailEle.setAttribute('name','email');
    emailEle.setAttribute('placeholder','Enter your email');
    emailEle.setAttribute('id','email');

    let passwordEle = document.createElement('input');
    passwordEle.setAttribute('type','password');
    passwordEle.setAttribute('name','password');
    passwordEle.setAttribute('placeholder','Enter your password');
    passwordEle.setAttribute('id','password');

    let buttonEle = document.createElement('button');
    buttonEle.innerText = 'Register';

    let divEle = document.createElement('div');
    divEle.classList.add('register');

    divEle.appendChild(nameEle);
    divEle.appendChild(emailEle);
    divEle.appendChild(passwordEle);
    divEle.appendChild(buttonEle);

    rootEle.appendChild(divEle);
    buttonEle.addEventListener('click',function doRegister(){
    const name = nameEle.value;
    const email = emailEle.value;
    const password = passwordEle.value;
    const data = {
        'name':name,
        'email':email,
        'password':password
    };
    fetch("http://localhost:8000/employees/register",{
        'method':'POST',
        'credentials':'include',
        'headers':{
            'Content-Type':'application/json'
        },
        'body':JSON.stringify(data)

    }).then((data)=>{
        return data.json();
    }).then((data)=>{
        h1Ele = document.createElement('h1');
        if(data.status_code === 409){
            h1Ele.innerText = `${data.message}`;
        }else{
            h1Ele.innerText = `Hi ${data.user.name}, You have been registered successfully`
        }
        rootEle.innerHTML = "";
    })
})
});
