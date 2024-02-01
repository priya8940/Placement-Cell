const interviewModel=require('../Model/interview')

module.exports.creatInterview =async (req, res)=>{
    const {company_name,interview_date} = req.body; 
    const interview=await interviewModel.create({
          "company_name":company_name,
          "interview_date":interview_date
      
    })
    res.json({
        'status_code':201,
        'message': 'interview has been created successfully',
        'interview':interview
    })
    return res;
    
}
module.exports.getAllInterview =async (req, res)=>{
    const interviews=await interviewModel.find()
    res.json({
            'status_code':200,
            'message': 'interviews has been fetched successfully',
            'students': interviews
        });
    return res;
}
module.exports.getInterview =async (req, res)=>{
    const id=req.params.id;
    const interview=await interviewModel.findById(id)
    res.json({
            'status_code':200,
            'message': 'interview has been fetched successfully',
            'students': interview
        });
    return res;
}
module.exports.deleteInterview =async (req, res)=>{
    const id=req.params.id;
    const interviewDel=await interviewModel.findByIdAndDelete(id)
    res.json({
            'status_code':200,
            'message': 'interview has been deleted successfully',
            'students': interviewDel
        });
    return res;
}