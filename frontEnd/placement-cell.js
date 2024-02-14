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
    document.getElementById('student').style.visibility='visible';
    document.getElementById('interview').style.visibility='visible';
    
    document.getElementById('add_stu').style.visibility='hidden';
    document.getElementById('add_interview').style.visibility='hidden';
}

function loggedOut(){
    let loginBtn = document.getElementById('log_in');
    loginBtn.style.visibility = 'visible';
    let registerBtn = document.getElementById('register');
    registerBtn.style.visibility = 'visible';

    let logOutBtn = document.getElementById('log_out');
    logOutBtn.style.visibility = 'hidden';
    
    document.getElementById('student').style.visibility='hidden';
    document.getElementById('interview').style.visibility='hidden';
    document.getElementById('add_stu').style.visibility='hidden';
    document.getElementById('add_interview').style.visibility='hidden';
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
        loggedOut();
        let h3Ele = document.createElement('h3');
        h3Ele.innerText = data.messege;
        let rootEle = document.getElementById('root');
        rootEle.innerHTML = '';
        // let reviewContainerDiv = document.getElementById('reviews-container');
        // reviewContainerDiv.innerHTML = '';
        rootEle.appendChild(h3Ele);
        
    })
})

var studentButton=document.getElementById('student');
   studentButton.addEventListener('click',()=>{

    fetch(`http://localhost:8000/students/allstudent`,{
        'method':'GET',
        'credentials':'include',
        'headers':{
            'Content-Type':'application/json'
          }
        }).then((data)=>{
        return data.json();
        }).then((res)=>{
           showStudents(res);
    })
});
let addStudentButton=document.getElementById('add_stu')
addStudentButton.addEventListener('click',addStudent)
function addStudent(){
    let rootEle=document.getElementById('root')
    rootEle.innerHTML="";

    let labelEle1=document.createElement('label');
    labelEle1.innerHTML="Student's name:"
    let inputEle1=document.createElement('input');
    
   
    let childDivEle1=document.createElement('div');
    childDivEle1.appendChild(labelEle1);
    childDivEle1.appendChild(inputEle1);

    let parentDiv=document.createElement('div');
    parentDiv.classList.add('student-data');
    parentDiv.appendChild(childDivEle1);

    let labelEle2=document.createElement('label');
    labelEle2.innerHTML="Student's Email:"
    let inputEle2=document.createElement('input');
    let childDivEle2=document.createElement('div');
    
    childDivEle2.appendChild(labelEle2);
    childDivEle2.appendChild(inputEle2);
    parentDiv.appendChild(childDivEle2);

    let labelEle3=document.createElement('label');
    labelEle3.innerHTML=" Student's college_name:"
    let inputEle3=document.createElement('input');
    let childDivEle3=document.createElement('div');
    
    childDivEle3.appendChild(labelEle3);
    childDivEle3.appendChild(inputEle3);
    parentDiv.appendChild(childDivEle3);

    let labelEle4=document.createElement('label');
    labelEle4.innerHTML=" Student's status:"
    let inputEle4=document.createElement('input');
    let childDivEle4=document.createElement('div');
   
    childDivEle4.appendChild(labelEle4);
    childDivEle4.appendChild(inputEle4);
    parentDiv.appendChild(childDivEle4);

    let labelEle5=document.createElement('label');
    labelEle5.innerHTML=" Student's dsa_score:"
    let inputEle5=document.createElement('input');
    let childDivEle5=document.createElement('div');
  
    childDivEle5.appendChild(labelEle5);
    childDivEle5.appendChild(inputEle5);
    parentDiv.appendChild(childDivEle5);

    let labelEle6=document.createElement('label');
    labelEle6.innerHTML=" Student's react_score:"
    let inputEle6=document.createElement('input');
    let childDivEle6=document.createElement('div');
   
    childDivEle6.appendChild(labelEle6);
    childDivEle6.appendChild(inputEle6);
    parentDiv.appendChild(childDivEle6);

    let labelEle7=document.createElement('label');
    labelEle7.innerHTML="Student's web_dev_score:"
    let inputEle7=document.createElement('input');
    let childDivEle7=document.createElement('div');
   
    childDivEle7.appendChild(labelEle7);
    childDivEle7.appendChild(inputEle7);
    parentDiv.appendChild(childDivEle7);

    let labelEle8=document.createElement('label');
    labelEle8.innerHTML="Enter Student's batch:"
    let inputEle8=document.createElement('input');
    let childDivEle8=document.createElement('div');
   
    childDivEle8.appendChild(labelEle8);
    childDivEle8.appendChild(inputEle8);
    parentDiv.appendChild(childDivEle8);

   
    var buttonEle=document.createElement('button');
    buttonEle.classList.add("button-field")
    buttonEle.innerHTML="Submit"
    let childDivEle9=document.createElement('div');
    childDivEle9.appendChild(buttonEle);
    buttonEle.addEventListener('click',submitDetails)
    parentDiv.appendChild(childDivEle9);
    rootEle.appendChild(parentDiv)


function submitDetails(){
        //console.log("this is running")
         let name = inputEle1.value;
         let email = inputEle2.value;
         let college_name= inputEle3.value
         let status=inputEle4.value; 
         let dsa_score=inputEle5.value;
         let react_score=inputEle6.value;
        let web_dev_score=inputEle7.value;
        let batch=inputEle8.value;
    
        let resdata = {
            "email":email,
            "name":name,
            "college_name":college_name,
            "status":status,
            "dsa_score":dsa_score,
            "react_score":react_score,
            "web_dev_score":web_dev_score,
            "batch":batch
        }
    
        fetch(`http://localhost:8000/students/register`,{
            'method':'POST',
            'credentials':'include',
            'headers':{
                'content-type':'application/json'
            },
            'body':JSON.stringify(resdata)
    
        }).then((data)=>{
            return data.json();
        }).then((data)=>{
            h1Ele = document.createElement('h1');
            if(data.status_code != 201){
                h1Ele.innerText = `Something Went Wrong`
            }else{
                fetch(`http://localhost:8000/students/allstudent`,{
                    'method':'GET',
                    'credentials':'include',
                    'headers':{
                        'Content-Type':'application/json'
                      }
                    }).then((data)=>{
                    return data.json();
                    }).then((res)=>{
                       showStudents(res);
                })
            }
            
        })
        
    }
}
//SHow All Student
function showStudents(data){
    document.getElementById('student').style.visibility='hidden';
    document.getElementById('add_stu').style.visibility='visible';
    document.getElementById('add_interview').style.visibility='hidden';
    document.getElementById('interview').style.visibility='hidden';
    let rootEle = document.getElementById('root');
    rootEle.innerHTML="";
    const studArr=data.students;
    for(let student of studArr){
        let divEle=document.createElement('div');
        divEle.classList.add('student-row');
        divEle.id=student._id;

        let nameEle = document.createElement('label');
        nameEle.innerText = student.name;
        nameEle.classList.add('name');
        divEle.appendChild(nameEle)
        

        let emailEle = document.createElement('label');
        emailEle.innerText = student.email;
        emailEle.classList.add('email');
        divEle.appendChild(emailEle)

        let batchEle = document.createElement('label');
        batchEle.innerText = student.batch;
        batchEle.classList.add('batch');
        divEle.appendChild(batchEle)

        let statusEle = document.createElement('label');
        statusEle.innerText = student.status;
        statusEle.classList.add('status');
        divEle.appendChild(statusEle)

        let updateButton = document.createElement('button');
        updateButton.innerText = 'update';
        updateButton.classList.add('update');
        divEle.appendChild(updateButton)
        

        let deleteButton = document.createElement('button');
        deleteButton.innerText = 'delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click',deleteStudent)


        divEle.appendChild(deleteButton)
        rootEle.appendChild(divEle)
    }

}
function deleteStudent(event){
    let divEle = event.target.parentElement;
    let id = divEle.id;
    fetch(`http://localhost:8000/students/delete/${id}`,{
        'method':'DELETE',
        'credentials':'include',
        'headers':{
            'content-cype':'application/json'
        }

    }).then((data)=>{
        return data.json();
    }).then((data)=>{
        let rootEle = document.getElementById('root');
        if(data.status_code===200 ){
            rootEle.removeChild(divEle)
        }
    }) 
}
var interviewButton=document.getElementById('interview');
interviewButton.addEventListener('click',()=>{
    fetch(`http://localhost:8000/interviews/all-interviews`,{
        'method':'GET',
        'credentials':'include',
        'headers':{
            'Content-Type':'application/json'
          }
        }).then((data)=>{
        return data.json();
        }).then((res)=>{
            showInterViews(res);
    })
});
function showInterViews(data){
   // console.log("its working")
    document.getElementById('student').style.visibility='hidden';
    document.getElementById('add_stu').style.visibility='visible';
    document.getElementById('add_interview').style.visibility='visible';
    document.getElementById('interview').style.visibility='hidden';
    
    let rootEle=document.getElementById('root')
     rootEle.innerHTML="";
    const interviewArr=data.interviews;
    
    for(let interview of interviewArr){
    
    let labelEle1=document.createElement('label');
    labelEle1.innerText=interview.company_name;
    labelEle1.addEventListener('click',showParticipants);
    // let pEle=document.createElement('p');
    // pEle.classList.add('para');
    // pEle.innerText="Company Name"
    let childDivEle1=document.createElement('div');
    let parentDivEle=document.createElement('div');
    parentDivEle.classList.add('interview_details')
    // parentDivEle.appendChild(pEle);
    let deleteButtonEle=document.createElement('button');

    ///////YUO HAVE TO ASK THIS PORTION
    //so here we are sending the real(Dynamic id) id to delete Interview
    // deleteButtonEle.setAttribute('id', interview._id);
    deleteButtonEle.innerHTML='Delete'
    deleteButtonEle.addEventListener('click',deleteInterview)

    
    //input box for addng participants by Email_id
    let inputEle=document.createElement('input');
    inputEle.setAttribute('name',interview.company_name);
    inputEle.setAttribute('id','interview'+interview._id)
    inputEle.style.visibility='hidden'
 
    let participantButtonEle=document.createElement('button');
    //participantButtonEle.setAttribute('id',interview._id);
    participantButtonEle.innerHTML='addParticipant'
    participantButtonEle.addEventListener('click',addParticipantButtonEle)

    
    childDivEle1.appendChild(labelEle1);
    parentDivEle.appendChild(childDivEle1);
    rootEle.appendChild(parentDivEle)
    


   
    let labelEle2=document.createElement('label');
    labelEle2.innerText=interview.interview_date
    let childDivEle2=document.createElement('div');
    // let pEle2=document.createElement('p');
    // pEle2.classList.add('para');
    // pEle2.innerText="Date-Of-Interview"
    // childDivEle2.appendChild(pEle2)
    childDivEle2.appendChild(labelEle2);
    parentDivEle.appendChild(childDivEle2)
    parentDivEle.id=interview._id
    rootEle.appendChild(parentDivEle)
    parentDivEle.appendChild(deleteButtonEle);
    parentDivEle.appendChild(inputEle);
    parentDivEle.appendChild(participantButtonEle);

    }
    
}
function showParticipants(event){
 //console.log(event.target.parentElement.parentElement.id)
 fetch(`http://localhost:8000/student-interview/get-students-by-interview/${event.target.parentElement.parentElement.id}`,{
        'method':'GET',
        'credentials':'include',
        'headers':{
            'Content-Type':'application/json'
          }
        }).then((data)=>{
        return data.json();
        }).then((res)=>{

            //show all Students and Status
          if(res.status_code==200){
            const studentInterviewList=res.students
            for(const  studentInterview of studentInterviewList){
                const studentId=studentInterview.stu_id;
                const status=studentInterview.result;

                fetch(`http://localhost:8000/students/${studentId}`,{
                    'method':'GET',
                    'credentials':'include',
                    'headers':{
                        'Content-Type':'application/json'
                 }
                }).then((data)=>{
                    return data.json();
                }).then((res)=>{
                    const student=res.students;
                    let root=document.getElementById('root');
                    root.innerHTML="";

                      //show in UI, name of student,email, and status
                    let nameEle=document.getElementById('name');
                    let emailEle=document.getElementById('email')
                    let status=document.getElementById('status')
                    

                   



                })
            }
           }
        })
}
function deleteInterview(event){
    fetch(`http://localhost:8000/interviews/delete/${event.target.parentElement.id}`,{
        'method':'DELETE',
        'credentials':'include',
        'headers':{
            'Content-Type':'application/json'
          }
        }).then((data)=>{
        return data.json();
        }).then((res)=>{
            //if status code is true so you have to reload page again so will call fetch and show interview
            if(res.status_code===200){
                fetch(`http://localhost:8000/interviews/all-interviews`,{
                    'method':'GET',
                    'credentials':'include',
                    'headers':{
                        'Content-Type':'application/json'
                    }
                    }).then((data)=>{
                    return data.json();
                    }).then((res)=>{
                        showInterViews(res);
        })

            }
    })
}
function addParticipantButtonEle(event){
    console.log("participantButtonEle")
    let interviewId=event.target.parentElement.id 
    let inputEle=document.getElementById('interview'+event.target.parentElement.id )
    if(inputEle.style.visibility!='visible'){
        inputEle.style.visibility='visible'
    }else{
        const emailId=inputEle.value;
        inputEle.style.visibility='hidden'
        fetch(`http://localhost:8000/students/get-student-byEmail`,{
            'method':'POST',
            'credentials':'include',
            'headers':{
                'Content-Type':'application/json'
            },
            'body': JSON.stringify({'email_id': emailId})

            }).then((data)=>{
            return data.json();
            }).then((res)=>{
                const studentId=res.students._id
                fetch(`http://localhost:8000/student-interview/register`,{
                    'method':'POST',
                    'credentials':'include',
                    'headers':{
                        'Content-Type':'application/json'
                      },
                      'body': JSON.stringify({'stu_id': studentId,'interview_id':interviewId,'result':'NOT ATTEMPTED'})
                    }).then((data)=>{
                    return data.json();
                    }).then((res)=>{
                       
                })
               
        })
    }
   

}
var addInterviewButton=document.getElementById('add_interview');
addInterviewButton.addEventListener('click',()=>{
    document.getElementById('student').style.visibility='hidden';
    document.getElementById('add_stu').style.visibility='hidden';
    document.getElementById('add_interview').style.visibility='visible';
    document.getElementById('interview').style.visibility='hidden';
    
    let rootEle=document.getElementById('root')
    rootEle.innerHTML="";

    let labelEle1=document.createElement('label');
    labelEle1.innerHTML="Company name:"
    let inputEle1=document.createElement('input');
    inputEle1.classList.add('input1')

    let childDivEle1=document.createElement('div');
    let parentDivEle=document.createElement('div');
    parentDivEle.classList.add('interview-data')

    childDivEle1.appendChild(labelEle1);
    childDivEle1.appendChild(inputEle1);
    parentDivEle.appendChild(childDivEle1);
    rootEle.appendChild(parentDivEle)
    
    let labelEle2=document.createElement('label');
    labelEle2.innerHTML="interview_date:"
    let inputEle2=document.createElement('input');
    inputEle2.setAttribute('type','date')
    inputEle2.classList.add('input1')
    let childDivEle2=document.createElement('div');
    childDivEle2.appendChild(labelEle2);
    childDivEle2.appendChild(inputEle2);
    parentDivEle.appendChild(childDivEle2)
    rootEle.appendChild(parentDivEle)


    var buttonEle=document.createElement('button');
    buttonEle.classList.add("input-button")
    buttonEle.innerHTML="Done" 
    let childDivEle3=document.createElement('div');
    childDivEle3.appendChild(buttonEle);
    parentDivEle.appendChild(childDivEle3)
    rootEle.appendChild(parentDivEle)

    buttonEle.addEventListener('click',()=>{
        let company_name = inputEle1.value;
        let interview_date = inputEle2.value;
       
        let resdata={
            'company_name':company_name,
            'interview_date':interview_date
        }
        fetch(`http://localhost:8000/interviews/register`,{
            'method':'POST',
            'credentials':'include',
            'headers':{
                'content-type':'application/json'
            },
            'body':JSON.stringify(resdata)
        }).then((data)=>{
            return data.json();
        }).then((data)=>{
            h1Ele = document.createElement('h1');
            if(data.status_code != 201){
                let rootEle=document.getElementById('root')
                rootEle.innerHTML="";
                h1Ele.innerText = `Something Went Wrong`
                rootEle.appendChild(h1Ele);
             }else{
                fetch(`http://localhost:8000/interviews/all-interviews`,{
                    'method':'GET',
                    'credentials':'include',
                    'headers':{
                        'Content-Type':'application/json'
                      }
                    }).then((data)=>{
                    return data.json();
                    }).then((res)=>{
                       showInterViews(res);
                })
                 }
        })   
    })



})


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
        }else{
            loggedOut();
        }
       
    })
}
amILoggedIn();

