let express = require("express");
let router = express.Router();
let admin = require("firebase-admin");
const db = admin.firestore();

//get single user profile
router.get("/get-profile/:user_id", (req, res) => {
  (async () => {
    try {
      //action
      const document = db.collection("Admin").doc(req.params.user_id);
      let user = await document.get();
      let response = user.data();

      //response
      return res.status(200).send({ data: response });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  })();
});

module.exports = router;
