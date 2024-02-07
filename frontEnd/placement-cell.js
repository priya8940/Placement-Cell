// async function register(){
//     let response=await fetch('http://localhost:8000/employees/getall')
//     let data=await response.json();
//     console.log(data);
// }
//register();

let registerButton = document.getElementById('register');

registerButton.addEventListener('click',()=>{
    let rootEle = document.getElementById('root');
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

    rootEle.innerHTML=""
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
        if(data.status_code === 201){
            h1Ele.innerText = `${data.message}`;
        }else{
            h1Ele.innerText = `Hi ${data.user.name}, You have been registered successfully`
        }
        rootEle.innerHTML = "";
        rootEle.appendChild(h1Ele);
    })
})
});
    //register ended here

   //login starts fromm here
   let loginButton = document.getElementById('log_in');

   loginButton.addEventListener('click',()=>{
       let rootEle = document.getElementById('root');
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
       buttonEle.innerText = 'Login';
   
       let divEle = document.createElement('div');
       divEle.classList.add('login');
   
       divEle.appendChild(emailEle);
       divEle.appendChild(passwordEle);
       divEle.appendChild(buttonEle);
       rootEle.innerHTML=""
       rootEle.appendChild(divEle);
   
       //Adding DO-Login event listner code
       buttonEle.addEventListener('click', function doLogin(){
           const emailId = emailEle.value;
           const pass = passwordEle.value;
   
           const data = {
               'email':emailId,
               'password':pass
           }
   
           fetch('http://localhost:8000/employees/login',{
               'method':'POST',
               'credentials':'include',
               'headers':{
                   'Content-Type':'application/json'
               },
               'body':JSON.stringify(data)
           }).then((data)=>{
               return data.json();
           }).then((data)=>{
               //1 user's email not registered in database
               //2 wront credentials
               //3 user is an admin
               //4 user is an employee
               h1Ele = document.createElement('h1');
               let rootEle = document.getElementById('root');
               rootEle.innerHTML = "";
               if(data.status_code===404){
                   //user not registered
                   h1Ele.innerText = 'User is not registered, Please register';
                   rootEle.appendChild(h1Ele);
               }else if(data.status_code===409){
                   //wrong credentials
                   h1Ele.innerText = 'Incorrect userid or password';
                   rootEle.appendChild(h1Ele);
               }else {
                  welcomeEmployee();
   
               }
           })
       })

})

function welcomeEmployee(){
    let loginBtn = document.getElementById('log_in');
    loginBtn.style.visibility = 'hidden';
    let registerBtn = document.getElementById('register');
    registerBtn.style.visibility = 'hidden';

    let logOutBtn = document.getElementById('log_out');
    logOutBtn.style.visibility = 'visible';
}
let logOutButton = document.getElementById('log_out');

logOutButton.addEventListener('click',()=>{
    fetch(`http://localhost:8000/employees/log_out`,{
        'method':'GET',
        'credentials':'include',
        'headers':{
            'content-type':'application/json'
        },

    }).then(data=>{
        return data.json();
    }).then(data=>{
        let loginBtn = document.getElementById('log_in');
        loginBtn.style.visibility = 'visible';
        let registerBtn = document.getElementById('register');
        registerBtn.style.visibility = 'visible';

        let logOutBtn = document.getElementById('log_out');
        logOutBtn.style.visibility = 'hidden';

        let h3Ele = document.createElement('h3');
        h3Ele.innerText = data.message;
        let rootEle = document.getElementById('root');
        rootEle.innerHTML = '';
        // let reviewContainerDiv = document.getElementById('reviews-container');
        // reviewContainerDiv.innerHTML = '';
        rootEle.appendChild(h3Ele);
        window.alert(data.message);
    })
})
   
 //SHow All Student
function showStudents(data){
    let rootEle = document.getElementById('root');
    let nameEle = document.createElement('label');
    nameEle.innerText = data.name;
    nameEle.classList.add('name');

    let emailEle = document.createElement('label');
    emailEle.innerText = data.email;
    emailEle.classList.add('email');

    let batchEle = document.createElement('label');
    batchEle.innerText = data.batch;
    batchEle.classList.add('batch');

    let statusEle = document.createElement('label');
    statusEle.innerText = data.status;
    statusEle.classList.add('status');

    let updateButton = document.createElement('button');
    updateButton.innerText = 'update';
    updateButton.classList.add('update');

    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'delete';
    deleteButton.classList.add('delete');

}


function amILoggedIn(){
    fetch(`http://localhost:8000/employees/checkSession`,{
      'credentials':'include',
      'headers':{
            'Content-Type':'application/json'
        },
    }).then(data=>{
        return data.json();
    }
       
    ).then(response=>{
        if(response.status_code===200){
            welcomeEmployee();
        }
       
    })
}
amILoggedIn();

