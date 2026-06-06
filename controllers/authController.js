const { User } = require("../models/user");
const bcrypt = require("bcrypt");


function handleHomePage(req, res) {
  return res.render("home", { message: null });
}

function handleGetLogin(req, res) {
  return res.render("auth/login", { message: null });
}
function handleGetSignup(req, res) {
  return res.render("auth/signup", { message: null });
}

async function handlePostSignup(req, res) {
  const { name, email, password } = req.body;

  const hashedPassword=await bcrypt.hash(password,10);
  console.log("HASHED PASSWORD ",hashedPassword);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    return res.redirect("/login?msg=Sign Up succesfull");
  } else {
    return res.redirect("/signup?msg=Sign Up Failed, Try Again");
  }
}

async function handlePostLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.redirect("/login?msg=enter email and password");
  }


  const user = await User.findOne({ email });
  if (!user) {
    return res.redirect("/signup?msg=SignUp First");
  }


  const hashedPassword = user.password;

  bcrypt.compare(password, hashedPassword, function (err, result) {
    if (err) {
        console.log(err);
      return res.redirect("/login?msg=some error in bcrypt ");
    }
    if (result != true) {
      return res.redirect("/login?msg=password not matched ");
    } else {
      req.session.user = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      if(req.session.user==='admin')
      {
        return res.redirect('/admin/dashboard');
      }

      return res.redirect('/user/dashboard');
    }
  });
}

module.exports = {
  handleHomePage,
  handleGetLogin,
  handleGetSignup,
  handlePostLogin,
  handlePostSignup,
};
