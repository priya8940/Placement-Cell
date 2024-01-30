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
