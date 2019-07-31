const Sequelize = require("sequelize")
const UserModel = require("./model/userModel")
var User
exports.connect = () => {
    const sequelize = new Sequelize({
        database : "authentication",
        username: "root",
        password: "",
        dialect : "mysql"
    })

    sequelize.authenticate()
    .then(()=>{
        console.log("Connection has been established successfully.");
    })
    .catch(err=>{
        console.error("Unable to connect to the database:"+err)
        
    })

    User = UserModel(sequelize,Sequelize)
    User.sync()
    .then(()=>{
        console.log("Oh yeah! User table created successfully.");
    })
    .catch(err=>{
        console.error("BTW, did you enter wrong database credential?")
        
    })
    
}
exports.createUser = async({name,password})=>{
    return await User.create({name,password})
}

exports.getAllUsers = async()=>{
    return await User.findAll()
}

exports.getUser = async obj =>{
    let res =  await User.findOne({
        where:obj
    })
    // console.log("res",res.dataValues);
   if(res) return res.dataValues
   else return false
    
}