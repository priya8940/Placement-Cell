const studentInterviewModel=require('../Model/student_interview')

module.exports.allocateInterviewToStudent=async (req, res)=>{
   const {interview_id,stu_id,result}=req.body;

   if(interview_id==undefined || stu_id==undefined){
    res.json({
        "message":"InterviewID or Stu_ID is Missing"
    })
    return res;
   }
    const createdInterview= await studentInterviewModel.create({
        "interview_id":interview_id , 
        "stu_id":stu_id,
        "result":result
    }) 
    res.json({
        "status_code":201,
        "message":"Interview has been allocated succesfully",
        "interview":createdInterview
    })
    return res;
}
module.exports.getAlocatedInterview =async (req, res)=>{
    const interviewId=req.params.id;
    const interview=await studentInterviewModel.findById(interviewId)
    res.json({
            'status_code':200,
            'message': 'interview has been fetched successfully',
            'students': interview
        });
    return res;
}
module.exports.getAllAllocatedInterview =async (req, res)=>{
    const interviews=await studentInterviewModel.find().populate('stu_id').populate('interview_id');
    res.json({
            'status_code':200,
            'message': ' All Alocated interviews  fetched successfully',
            'interviews': interviews
        });
    return res;
}
module.exports.deleteAllocatedInterview =async (req, res)=>{
    const id=req.params.id;
    const interviewDel=await studentInterviewModel.findByIdAndDelete(id)
    res.json({
            'status_code':200,
            'message': 'interview has been deleted successfully',
            'students': interviewDel
        });
    return res;
}
module.exports.getStudentByInterview =async (req, res)=>{
    const id=req.params.id;
    const students=await studentInterviewModel.find({'interview_id':id})
    res.json({
            'status_code':200,
            'message': 'all students of Interview has been fetched successfully',
            'students': students
        });
    return res;
}
module.exports.UpdateStudentInterview =async (req, res)=>{
    const id=req.params.id;
    const interviewStatus=req.body.status;
    const studentInterview=await studentInterviewModel.findByIdAndUpdate(id,{'result':interviewStatus})
    res.json({
            'status_code':200,
            'message': 'student interview has been updated successfully',
            'student-interview': studentInterview
        });
    return res;
}
