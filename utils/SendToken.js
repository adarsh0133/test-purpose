require("dotenv").config({ path: "./.env" });
exports.sendtoken = (author, statusCode, res) => {
  const token = author.getjwttoken();

  const options = {
    exipres: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, id: author._id, token });
};

