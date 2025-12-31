import Service from "../models/ServiceModels.js";

export const service = async (req, res) => {
  try {
    const service = await Service.create({
      ...req.body,
      sellerId: req.user.id,
    });
    // console.log("Service sellerId:", service.sellerId);
    // console.log("Buyer ID:", req.user.id);
    if (!service) {
      return res.status(400).json({
        success: false,
        message: "service error ",
      });
    }
    console.log(res.data)

    return res.status(200).json({
        success:true,
        service
    })


  } catch (error) {
    console.log("serviece error ",error)
    return res.status(500).json({
        success:false,
        message:"server site error "
    })
  }
};

export const getSerVices =async(req,res)=>{
    try {
        const services =await Service.find({isActive:true});
        return res.status(200).json({
        success:true,
        services
    })
    } catch (error) {
        console.log("getSerVices error ",error)
    return res.status(500).json({
        success:false,
        message:"server site error "
    })
    }
}
