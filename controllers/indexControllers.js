const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Author = require("../models/authormodel");
const errorHandler = require("../utils/errorHandler");
const { sendtoken } = require("../utils/SendToken");
const Book = require("../models/booksmodel");
// const { sendmail } = require("../utils/nodemailer");
// const path = require("path");
// const imagekit = require("../utils/imageKit").initImageKit();

exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "helllo" });
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
  const author = await Author.findById(req.id).exec();
  res.json({ author });
});

exports.AuthorSignup = catchAsyncErrors(async (req, res, next) => {
  const author = await new Author(req.body).save();
  sendtoken(author, 201, res);
});

exports.AuthorLogin = catchAsyncErrors(async (req, res, next) => {
  const author = await Author.findOne({$or: [{ email:req.body.email }, { username:req.body.username }],})
    .select("+password")
    .exec();
  if (!author)
    return next(
      new errorHandler("user not found with this email or username", 404)
    );
  const isMatch = author.comparepassword(req.body.password);
  if (!isMatch) return next(new errorHandler("wrong credientials", 500));

  sendtoken(author, 200, res);
});

exports.AuthorLogout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "Successfully logout!" });
});

exports.AuthorUpdate = catchAsyncErrors(async (req, res, next) => {
  const author = await Author.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Author Updated Successfully!",
    author,
  });
});

exports.AuthorResetPassword = catchAsyncErrors(async (req, res, next) => {
  const author = await Author.findById(req.id).exec();
  author.password = req.body.password;
  await author.save();

  sendtoken(author, 201, res);
});

exports.createBook = catchAsyncErrors(async(req, res ,next) => {
    const author = await Author.findById(req.id).exec();
    const book = await new Book(req.body).save();
    book.author = author._id;
    author.books.push(book._id);
    await book.save();
    await author.save();
    res.status(201).json({ success: true, book });
})

// exports.studentSendMail = catchAsyncErrors(async (req, res, next) => {
//   const student = await Student.findOne({ email: req.body.email }).exec();
//   if (!student)
//     return next(
//       new errorHandler("user not found with this email address", 404)
//     );
//   const url = `${req.protocol}://${req.get("host")}/student/forget-link/${
//     student._id
//   }`;

//   sendmail(req, res, next, url);
//   student.resetPassToken = "1";
//   await student.save();
//   // res.json({ student, url});
// });

// exports.studentForgotPassLink = catchAsyncErrors(async (req, res, next) => {
//   const student = await Student.findById(req.params.id).exec();

//   if (!student)
//     return next(
//       new errorHandler("user not found with this email address", 404)
//     );

//   if (student.resetPassToken == "1") {
//     student.resetPassToken = "0";
//     student.password = req.body.password;
//   } else {
//     return next(
//       new errorHandler("Invalid Password Link! Please try again", 404)
//     );
//   }

//   await student.save();

//   res.status(200).json({
//     message: "Password has been successfully changed",
//   });
// });

// exports.studentAvatar = catchAsyncErrors(async (req, res, next) => {
//   const student = await Student.findById(req.params.id).exec();
//   const file = req.files.avatar;
//   const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
//     file.name
//   )}`;

//   if (student.avatar.fileId !== "") {
//     await imagekit.deleteFile(student.avatar.fileId);
//   }

//   const { fileId, url } = await imagekit.upload({
//     file: file.data,
//     fileName: modifiedFileName,
//   });

//   student.avatar = { fileId, url };
//   await student.save();

//   res.status(200).json({
//     success: true,
//     message: "Student Profile Image Uploaded Successfully!",
//   });
// });
