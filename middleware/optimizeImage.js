// optimizeImage.js
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const optimizeImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const optimizedFilename = `${req.file.filename.split(".")[0]}.webp`;

    const outputPath = path.join(__dirname, "../images", optimizedFilename);

    await sharp(req.file.path).webp({ quality: 30 }).toFile(outputPath);

    fs.unlink(req.file.path, (err) => {
      if (err)
        console.error(
          "Erreur lors de la suppression du fichier temporaire :",
          err
        );
    });

    req.file.optimizedFilename = optimizedFilename;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'optimisation de l'image", error });
  }
};

module.exports = optimizeImage;
