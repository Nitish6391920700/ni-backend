import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"


const registerUser = asyncHandler(async (req, res) => {
  //get user detail from frontend
  // check for empty forms
  // check if user already exist : username,email
  // check for images , must for avatar
  //upload images on cloudanary , and sure for avatar is uploadesd
  //create userObject in db
  // remove password and refreshToken from response
  //check for user creation
  //return response

  //destructring frontend data
  //frontend ka pura data req.body se mil jata h
  const { username, email, fullName, password } = req.body;
  console.log("email:", email);
  //validation
  //we can use simple if and else to check or validate
  if (
    [fullName, username, password, email].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(409, "all fields are compulsary");
  }
  //checkking if user already exist
  // only User can communicate with database so we use User.findOne to find if data already exist
  const existedUser = await User.findOne({
    $or: [{ username }, { email }], // this is for checking by two fields we can siply provide multiple check or single check
  });
  if (existedUser) {
    //if data is already found then throw error
    throw new ApiError(409, "User already existed");
  }
  //checking images
  const avatarLocalPath = req.files?.avatar[0]?.path;
  //   const coverImageLocalPath = req.files?.coverImage[0]?.path; // this is giving undefined so ->
  //custom check for above line
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }
  //checking for avatar
  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar is needed");
  }
  //uploading on cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  //check avatar again
  if (!avatar) {
    throw new ApiError(400, "avatar is not uploaded");
  }
  // entry in db
  console.log(username)
  const user = await User.create({
    fullName,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "", // ho skta h ki user ne upload na kiya ho
    email,
     username: username.toLowerCase(),
  });
  //checking if user created
  const checkUser = await User.findById(user._id).select(
    //kya kya nhi chahiye response me jo user ko dikhana h
    "-password -refreshToken"
  );
  if (!checkUser) {
    throw new ApiError(500, "error while creating user");
  }
  // returning res
  return res
    .status(201)
    .json(new ApiResponse(200, "user Resistered Successfully", checkUser));
});

export {registerUser}