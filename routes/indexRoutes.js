const express = require("express");
const router = express.Router();
const {
  homepage,
  AuthorSignup,
  AuthorLogin,
  currentUser,
  AuthorLogout,
  AuthorUpdate,
  AuthorResetPassword,
  createBook,
} = require("../controllers/indexControllers");
const { isAuthenticated } = require("../middlewares/auth");

// GET /
router.get("/", homepage);

// POST /author
router.post("/author", isAuthenticated, currentUser);

// POST /author/signup
router.post("/author/signup", AuthorSignup);

// // POST /author/login
router.post("/author/login", AuthorLogin);

// // GET /author/logout
router.get("/author/logout", isAuthenticated, AuthorLogout);

// POST /author/update/:id
router.post("/author/update/:id",isAuthenticated, AuthorUpdate);

// POST /author/reset-password/:id
router.post("/author/reset-password/:id",isAuthenticated, AuthorResetPassword);

// POST /author/send-mail
// router.post("/author/send-mail", AuthorResetPassword);

// GET /author/forget-link/:id
// router.get("/student/forget-link/:id", studentForgotPassLink);

// POST /author/avatar/:id
// router.post("/student/avatar/:id",isAuthenticated, studentAvatar);

module.exports = router;
