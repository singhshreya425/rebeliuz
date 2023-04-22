const userModel=require("../model/model")


const createUser = async (req, res) => {
    try {
      const data = req.body;
      const {title,name,phone,email,password,street,city,pincode} = data;
      let address={
        "street":street,
        "city":city,
        "pincode":pincode
      }
      data.address=address;
      data.password = await userModel.findOne({password:password})
      const datacreate = await userModel.create(data);
      res.status(201).send({ status: true, data: datacreate });
    } catch(err) {
      return res.status(500).send({status: false, message: err.message});
    }
  };

  //<----------------------< LogIn User Data from DataBase >------------------->//

const logInUserData = async (req, res) => {
    try {
      const data = req.body;
      if (Object.keys(data).length == 0)
        return res.status(400).send({
          status: false,
          message: "Pls provide the Email-id and password",
        });
      const { email, password } = data;
      if (!email)
        return res
          .status(400)
          .send({ status: false, message: "Pls provide the emailId" });
      if (!validation.isValidEmailId(email))
        return res
          .status(400)
          .send({ status: false, message: "pls provide the Valid Email" });
      if (!password)
        return res
          .status(400)
          .send({ status: false, message: "Pls provide the password" });
  
      const user = await userModel.findOne({ email: email });
  
      if (!user)
        return res
          .status(404)
          .send({ status: false, message: "You are not a valid user" });
  
  
      return res.status(200).send({
        status: true,
        message: "User login successfull",
        userId: { userId: user._id},
      });
    } catch (err) {
      return res.status(500).send({status: false, message: err.message});
    }
  };
  

  //<----------------------< Get User Data from DataBase >------------------->//

const getUserData = async (req, res) => {
    try {
      const id = req.params.userId;
  
      const data = await userModel
        .findById(id)
        .select({ createdAt: 0, updatedAt: 0, __v: 0 })
        .lean();
      const { address, ...userdata } = data;
      res.status(200).send({
        status: true,
        message: "User profile details",
        data: data.address,
        userdata,
      });
    } catch (err) {
      return res.status(500).send({status: false, message: err.message});
    }
  };

  module.exports = { createUser, logInUserData, getUserData };