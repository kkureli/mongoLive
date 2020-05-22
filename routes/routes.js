let WorkEffort = require("../models/workEffort");
let Comment = require("../models/comment");

module.exports = (app) => {
  app.get("/work-effort/:workId/comments", (req, res) => {
    WorkEffort.findById(req.params.workId)
      .populate("comment")
      .exec((err, comments) => {
        if (err) {
          res.status(400).json("Error: " + err);
        } else {
          res.json(comments);
        }
      });
  });

  app.post("/work-effort/:workId/comments", (req, res) => {
    const { comment } = req.body;
    const { workId } = req.params;

    const newComment = new Comment({
      comment,
      work_effort_id: workId,
    });
    const _id = newComment._id;

    WorkEffort.findById(workId).then((work) => {
      if (work === null) {
        console.log("Work couldn't find");
      } else {
        work.comment.push(_id);

        work
          .save()
          .then(() => res.json("Comment added"))
          .catch((err) => res.status(400).json("Error: " + err));
      }
    });
    newComment.save().catch((err) => res.status(400).json("Error: " + err));
  });

  app.delete("/work-effort/:workId/comments/:commentId", (req, res) => {
    const { workId, commentId } = req.params;
    WorkEffort.findByIdAndUpdate(workId, {
      $pull: { comment: commentId },
    }).catch((err) => res.status(400).json("Error: " + err));

    Comment.findByIdAndDelete(commentId)
      .then(() => res.json("Comment deleted"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
};
