module.exports = (sequlize,type)=>{
    return sequlize.define('user',{
        name : {
            type : type.STRING,
        },
        password: {
            type : type.STRING,
        }
    })
}