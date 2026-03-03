import multer from "multer";
import HttpError from "./httpError.js";
import path from "path";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});




const fileFilter = (req, file, cb) => {

  const allowedFiles = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/heic",
    "image/gif",
  ];

  if (!allowedFiles.includes(file.mimetype)) {
    return cb(new HttpError("Unsupported file type", 400), false);
  }

  cb(null, true);
};



const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024  }, 
});

export default upload;
