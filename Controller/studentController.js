const studentModel=require('../Model/student')


module.exports.register =async (req, res)=>{
    const {college_name,status,dsa_score,react_score,web_dev_score,name,email,batch} = req.body;
    // console.log(req.body)
    // console.log( college_name)
    // console.log(status)
    // console.log(dsa_score)
    // console.log(react_score)
    // console.log(web_dev_score)
    // console.log(name)
    // console.log(email)

   
    const userFound = await studentModel.findOne({'email':email});
    if(userFound!=null){
        res.json({
            'status_code':409,
            'message': 'student already Exist'
        });
        return res;
    }
    const savedStudent=await studentModel.create({
        'email':email,
        'name':name,
        'college_name':college_name,
        'status':status,
        'dsa_score':dsa_score,
        'react_score':react_score,
        'web_dev_score':web_dev_score,
        'batch':batch
      
    })
    res.json({
            'status_code':201,
            'message': 'User has been added successfully',
            'student': savedStudent
        });
    return res;
}
module.exports.getAllStudent =async (req, res)=>{
    const cookie=req.cookies.id;
    if(cookie==-1){
        res.json({
            'status_code':403,
            'message': 'You ARE not authoriged',
            
        });
    }
    const studentArrList=await studentModel.find()
    res.json({
            'status_code':200,
            'message': 'students  has been fetched successfully',
            'students': studentArrList
        });
    return res;
}


module.exports.deleteStudent = async (req, res)=>{
    //const id = req.params.id;
    console.log(id)
    const student=await studentModel.findById(id)
    if(student==null){
        res.json({
            'message': 'student does not exist',
            'status_code': 404
        })
        return res;
    }
    const deleteStudent = await studentModel.findByIdAndDelete(id);
    res.json({
        'message': 'student has been deleted succesfully',
        'status_code': 200
    })
    return res;
    
}
module.exports.getStudent = async (req, res)=>{
    const id = req.params.id;
    //console.log(id)
    const student=await studentModel.findById(id)
        res.json({
            'message': 'Student has been fetched succcesfully',
            'status_code': 200,
            'students':student
        })
        return res;
    
}

