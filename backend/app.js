require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const PORT = 3001;
const app = express();

app.use(express.static("../frontend/build"));
app.use(express.json());
app.use(cookieParser());

// app.get("/posts", async (req, res) => {
//   const { posts, lastPage } = await getPosts(
//     req.query.search,
//     req.query.limit,
//     req.query.page
//   );

//   res.send({ data: { posts: posts.map(mapPost), lastPage } });
// });

// app.get("/posts/:id", async (req, res) => {
//   const post = await getPost(req.params.id);

//   res.send({ data: mapPost(post) });
// });

// // ------ контроль роли!
// app.use(auntheficated);

// app.post("/posts/:id/comments", async (req, res) => {
//   const newComment = await addComment(req.params.id, {
//     author: req.user.id,
//     content: req.body.content,
//   });
//   res.send({ data: mapComment(newComment) });
// });

// app.delete(
//   "/posts/:postId/comments/:commentId",
//   hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
//   async (req, res) => {
//     await deleteComment(req.params.postId, req.params.commentId);

//     res.send({ error: null });
//   }
// );

// app.post("/posts", hasRole([ROLES.ADMIN]), async (req, res) => {
//   const newPost = await addPost({
//     title: req.body.title,
//     content: req.body.content,
//     image: req.body.imageUrl,
//   });

//   res.send({ data: mapPost(newPost) });
// });

// app.patch("/posts/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
//   const updatedPost = await editPost(req.params.id, {
//     title: req.body.title,
//     content: req.body.content,
//     image: req.body.imageUrl,
//   });

//   res.send({ data: mapPost(updatedPost) });
// });

// app.delete("/posts/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
//   await deletePost(req.params.id);

//   res.send({ error: null });
// });

// app.get("/users", hasRole([ROLES.ADMIN]), async (req, res) => {
//   const users = await getUsers();

//   res.send({ data: users.map(mapUser) });
// });

// app.get("/users/roles", hasRole([ROLES.ADMIN]), async (req, res) => {
//   const roles = getRoles();

//   res.send({ data: roles });
// });

// app.patch("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
//   const newUser = await updateUser(req.params.id, {
//     role: req.body.roleId,
//   });

//   res.send({ data: mapUser(newUser) });
// });

// app.delete("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
//   await deleteUser(req.params.id);

//   res.send({ error: null });
// });

app.use("/", routes);

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(PORT, () => {
    console.log(`Server has beem started on port ${PORT}`);
  });
});
