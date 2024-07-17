const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const tokenCookie = req.cookies?.uid;
  req.user = null;
  if (!tokenCookie) return res.render("login");
  const token = tokenCookie;
  try {
    const user = getUser(token)
    req.user = user;
   return next();
  } catch (error) {
    return res.status(401).json({error:"Unauthorized"})
  }
}

function roleverify( roles = []){
  return function(req, res,next){
  if(!req.user) return res.redirect("/login");
  if(!roles.includes(req.user.role)) return res.end(`Unauthorized`);
    return next();
  }
}

module.exports = {
  restrictToLoggedinUserOnly, roleverify
}
