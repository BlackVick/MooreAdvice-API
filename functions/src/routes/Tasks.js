let express = require("express");
let router = express.Router();
let admin = require("firebase-admin");
const db = admin.firestore();

//define FieldValue
const FieldValue = admin.firestore.FieldValue;

//create task
router.post("/add-task", (req, res) => {
  (async () => {
    try {
      //create document link
      let document = db.collection("Tasks").doc(req.body.task_token);

      //action
      await document.create({
        task_title: req.body.task_title,
        task_description: req.body.task_description,
        task_assignee: req.body.task_assignee,
        task_time_frame: req.body.task_time_frame,
        task_priority: req.body.task_priority,
        task_time_created: FieldValue.serverTimestamp(),
        task_token: req.body.task_token,
        task_status: "Active",
      });

      //response
      return res.status(200).send({ message: "New Task Added" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error, message: error.message });
    }
  })();
});

//get single task
router.get("/get-task/:task_token", (req, res) => {
  (async () => {
    try {
      //action
      const document = db.collection("Tasks").doc(req.params.task_token);
      let product = await document.get();
      let response = product.data();

      //response
      return res.status(200).send({ data: response });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  })();
});

//update task
router.post("/update-task", (req, res) => {
  (async () => {
    try {
      //create document link
      let document = db.collection("Tasks").doc(req.body.task_token);

      //action
      await document.update({
        task_title: req.body.task_title,
        task_description: req.body.task_description,
        task_assignee: req.body.task_assignee,
        task_time_frame: req.body.task_time_frame,
        task_priority: req.body.task_priority,
        task_status: req.body.task_status,
      });

      //response
      return res.status(200).send({ message: "Task Updated" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error, message: error.message });
    }
  })();
});

//get all active tasks
router.get("/get-tasks", (req, res) => {
  (async () => {
    try {
      //action
      let query = db.collection("Tasks").orderBy("task_time_created", "asc");
      let response = [];

      await query.get().then((querySnapshot) => {
        let tasks = querySnapshot.docs;

        for (let doc of tasks) {
          const selectedItem = {
            task_token: doc.id,
            task_title: doc.data().task_title,
            task_description: doc.data().task_description,
            task_assignee: doc.data().task_assignee,
            task_priority: doc.data().task_priority,
            task_status: doc.data().task_status,
          };
          response.push(selectedItem);
        }
        return response;
      });

      //response
      return res.status(200).send({ data: response });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  })();
});

//delete task
router.delete("/delete-task/:task_token", (req, res) => {
  (async () => {
    try {
      //values
      const document = db.collection("Tasks").doc(req.params.task_token);

      //action
      await document.delete();

      //response
      return res.status(200).send({ message: "Task deleted" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ error: error, message: "Error occurred, try later" });
    }
  })();
});

module.exports = router;
