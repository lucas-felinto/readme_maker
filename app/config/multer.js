const { mkdir, existsSync } = require("fs");
const multer = require("multer");
const path = require("path");
const { randomBytes } = require("crypto");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    // eslint-disable-next-line no-undef
    const uploadDir = path.resolve(__dirname, "..", "..", "public", "uploads");

    if (!existsSync(uploadDir)) {
      mkdir(uploadDir, (err) => {
        if (err) throw new Error(err.message);

        cb(null, uploadDir);
      });
    } else {
      cb(null, uploadDir);
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${randomBytes(8).toString("hex")}-${file.originalname.replace(
        /[\s]+/g,
        "-"
      )}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  const isaccepted = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/svg+xml",
  ].filter((acceptedFile) => acceptedFile == file.mimetype);

  if (isaccepted) return cb(null, true);

  return cb(null, false);
};

module.exports = multer({
  storage,
  fileFilter,
});
