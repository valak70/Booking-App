import express from "express";
const router = express.Router();
import Hotel from "../models/hotel.js"
import { createError } from "../utils/error.js";
import { createHotel, deleteHotel, getCountByCity, getCountByType, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
//CREATE
router.post("/",verifyAdmin, createHotel)
//UPDATE
router.put("/:id", verifyAdmin,updateHotel)
//DELETE
router.delete("/:id", verifyAdmin,deleteHotel)
//GET
router.get("/find/:id", getHotel)
//GET ALL
router.get("/", getHotels)
router.get("/countByCity", getCountByCity)
router.get("/countByType", getCountByType)
router.get("/room/:id", getHotelRooms)

export default router