const empModel=require('../Model/employee')
 
module.exports.register =async (req, res)=>{
    const {email, name, password} = req.body;
    // console.log(req.body);
    // console.log(email)
    // console.log(name)
    // console.log(password)
    const userFound = await empModel.findOne({'email':email});
    if(userFound!=null){
        res.json({
            'status_code':409,
            'message': 'User already Exist , please login first'
        });
        return res;
    }
    const savedUser=await empModel.create({
        'email':email,
        'name':name,
        'password':password
    })
    res.json({
            'status_code':201,
            'message': 'User has been registered successfully',
            'user': savedUser
        });
    return res;
}


module.exports.getEmp =async (req, res)=>{
    const id = req.params.id;
    const employee=await empModel.findById(id);
    if(employee==null){
        res.json({
            'status_code':404,
            'message': 'Employee not found'
        });
        return res;
    }
    res.json({
            'status_code':200,
            'message': 'Employee  has been fetched successfully',
            'employee': employee
        });
    return res;
}
module.exports.logIn = async (req, res) =>{
    const {email, password} = req.body;
    //check if user exists before login
    const userFound = await empModel.findOne({'email':email});
    if(userFound==null){
        res.json({
            'status_code':404,
            'message': "User not found in database"
        })
        return res;
    }

    if(password===userFound.password){
        //setting cookie in response
        res.cookie('emp_id', userFound._id.toString()),{
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        };
        res.json({
            'status_code':200,
            'message':'User logged in successfully',
            'user': userFound
        });
        return res;
    }else{
        //password is not correct
        res.json({
            'status_code':409,
            'message':'Enter the correct password'
        });
        return res;
    }
}

module.exports.checkSession=async (req,res)=>{
    const cookie=req?.cookie?.emp_id;
    if(cookie==null || cookie==undefined || cookie=="" || cookie==-1){
        res.json({
                'status_code':404,
                'message': 'please log in first',
        });
        return res;
    }
    const emp= await empModel.findById(cookie);
    if(emp==null){
        res.json({
            'status_code':404,
            'message': 'Please log in first',
        });
        return res;
    }
    res.json({
        'status_code':200,
        'message': 'User is LoggedIn',
        'employee':emp
    })
}





