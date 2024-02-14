import Hotel from "../models/hotel.js";
import Room from "../models/room.js";

export const createHotel = async(req,res,next)=>{
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel)
    } catch (err) {
        next(err)
    }
}
export const updateHotel = async(req,res,next)=>{
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
        res.status(200).json(updatedHotel)
    } catch (err) {
        next(err)
    }
}
export const deleteHotel = async(req,res,next)=>{
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted.")
    } catch (err) {
        next(err)
    }
}
export const getHotel = async(req,res,next)=>{
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    }
}
export const getHotels = async(req,res,next)=>{
    try {
        // const limit = parseInt(req.query.limit,10) || 4;
        // console.log(req.query);
        const {min,max,limit, ...others} = req.query
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice : {$gt:min||1,$lt:max||100000}
        }).limit(limit)
        res.status(200).json(hotels) 
    } catch (err) {
        // next(err)
        next(err)
    }
}
export const getCountByCity = async(req,res,next)=>{
    // console.log("here");
    const cities = req.query.cities.toLowerCase().split(",")
    try{
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:{$regex:new RegExp(city,'i')}})
        }))
        res.status(200).json(list)
    }catch(err){
        next(err)
    }
}
export const getCountByType = async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });
      const cabinCount = await Hotel.countDocuments({ type: "cabin" });
  
      res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount },
      ]);
    } catch (err) {
      next(err);
    }
};
export const getHotelRooms = async (req,res,next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(
        hotel.rooms.map((room) => {
            return Room.findById(room);
        })
        );
        res.status(200).json(list)
    }catch(err){
        next(err)
    }
}
