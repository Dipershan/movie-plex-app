const router = require("express").Router();
const movieController = require("./movie.controller");
const { secure } = require("../../utils/secure");
const multer = require("multer");
  
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload/movies");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname.concat(
        "-",
        Date.now(),
        ".",
        file.originalname.split(".")[1]
      )
    );
  },
  // How to limit the file size; 1MB limit??
});

const upload = multer({ storage: storage });

router.get("/", async (req, res, next) => {
  try {
    const { page, limit, title } = req.query;
    const search = { title };
    const result = await movieController.list({ page, limit, search });
    res.json({ msg: "All movies list", data: result });
  } catch (e) {
    next(e);
  }
});

router.post(
  "/",
  secure(["admin"]),
  upload.single("poster"),
  async (req, res, next) => {
    try {
      if (req.file) {
        req.body.poster = req.file.path;
      }
      req.body.createdBy = req.currentUser;
      const result = await movieController.create(req.body);
      res.json({ msg: "Created new movie", data: result });
    } catch (e) {
      next(e);
    }
  }
);

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    // res.json({ msg: `Read one movie by ${id}`, data:  id });

    const result = await movieController.getById(id);
    res.json({ msg: `Read one movie by ${id}`, data: result });
  } catch (e) {
    next(e);
  }
});

// router.put(
//   "/:id",
//   secure(["admin"]),
//   upload.single("poster"),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       req.body.updatedBy = req.currentUser;
//       const result = await movieController.updateById(id, req.body);
//       res.json({ msg: `Update one movie by ${id}`, data: result });
//     } catch (e) {
//       next(e);
//     }
//   }
// );

router.put("/:id", secure(["admin"]), async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    console.log("Updating movie with ID:", id);
    console.log("Payload:", payload);
    const result = await movieController.updateById(id, payload);
    res.json({ msg: "Movie Updated Successfully", data: result });
  } catch (e) {
    next(e);
  }
});


// router.put(
//   "/:id",
//   secure(["admin"]),
//   // upload.single("poster"),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       req.body.updatedBy = req.currentUser;
//       const result = await movieController.update(id, req.body);
//       res.json({ msg: `Update one movie by ${id}`, data: result });
//     } catch (e) {
//       next(e);
//     }
//   }
// );

router.put("/:id", secure(["admin"]), async (req, res, next) => {
  try {
    const result = await movieController.updateById(req.params.id, req.body);
    res.json({ msg: "Movie Updated Successfully", data: result });
  } catch (e) {
    next(e);
  }
});


router.delete("/:slug", secure(["admin"]), async (req, res, next) => {
  try {
    const { slug } = req.params;
    const result = await movieController.remove(slug);
    res.json({ msg: `Delete one movie by ${slug}`, data: result });
  } catch (e) {
    next(e);
  }
});

router.patch("/:slug/seats", secure(["admin"]), async (req, res, next) => {
  try {
    const { slug } = req.params;
    req.body.updatedBy = req.currentUser;
    const result = await movieController.updateSeats(slug, req.body);
    res.json({
      msg: `Update the seat number of one movie by ${slug}`,
      data: result,
    });
  } catch (e) {
    next(e);
  }
});


router.patch(
  "/:slug/release-date",
  secure(["admin"]),
  async (req, res, next) => {
    try {
      const { slug } = req.params;
      req.body.updatedBy = req.currentUser;
      const result = await movieController.updateReleaseDate(slug, req.body);
      res.json({
        msg: `Update the release date of one movie by ${slug}`,
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;