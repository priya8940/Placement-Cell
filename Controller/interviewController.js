const interviewModel=require('../Model/interview')
module.exports.creatInterview =async (req, res)=>{
    const {company_name,interview_date} = req.body;
    const userFound = await interviewModel.findOne({'company_name':company_name});
    if(company_name!=null){
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