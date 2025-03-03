import path from "node:path";
import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      const uploadPath = path.resolve(__dirname, "../../public/uploads/");
      callback(null, uploadPath);
    },
    filename: (req, file, callback) => {
      if (!req.body.specie) {
        return callback(
          new Error("Le nom de l'espèce est requis pour nommer les fichiers"),
          "",
        );
      }

      const isBaby = file.filename === "babyImage";
      const fileName = `${req.body.specie}_${isBaby ? "bebe" : "adulte"}${path.extname(file.originalname)}`;

      callback(null, fileName);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.startsWith("image/")) {
      req.fileValidationError = "Seuls les fichiers images sont acceptées";
      return callback(null, false);
    }

    callback(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export default upload;
