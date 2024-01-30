const studentModel=require('../Model/student')


module.exports.register =async (req, res)=>{
    const {college_name,status,dsa_score,react_score,web_dev_score,name,email} = req.body;
    console.log(req.body)
    console.log( college_name)
    console.log(status)
    console.log(dsa_score)
    console.log(react_score)
    console.log(web_dev_score)
    console.log(name)
    console.log(email)

   
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
      
    })
    res.json({
            'status_code':201,
            'message': 'User has been added successfully',
            'student': savedStudent
        });
    return res;
}
module.exports.getAllStudent =async (req, res)=>{
    const studentArrList=await studentModel.find()
    res.json({
            'status_code':200,
            'message': 'student  has been fetched successfully',
            'students': studentArrList
        });
    return res;
}

module.exports.deleteStudent=async(req,res)=>{

}
module.exports.delete = async (req, res)=>{
    const coockie = req.cookies._id;
    const loggedInStu = await studentModel.findById(coockie);
    if(loggedInStu==null){
        res.json({
            'message': 'student is not logged in',
            'status_code': 403
        })
        return res;
    }
}