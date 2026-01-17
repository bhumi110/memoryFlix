const multer = require("multer");
const path = require("path");

//--------video--------------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "video") {
      cb(null, "uploads/videos");
    } else {
      cb(null, "uploads/thumbnails");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload= multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 },
});




//-------------------Series cover--------------------------------------
const coverStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/series"); // new folder
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});


const coverFileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const uploadCover = multer({
  storage: coverStorage,
  fileFilter: coverFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

module.exports = {
    upload,
    uploadCover
};
