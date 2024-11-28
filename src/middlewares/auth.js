
const adminAuth = (req, res, next) => {
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
   if(!isAdminAuthorized){
      res.status(401).send("User is not Authorized");
    }
    else {
        next();
    }
};

const userAuth = (req, res, next) => {
    const token = "xyz";
    const isAdminAuthorized = token === "xyzfff";
   if(!isAdminAuthorized){
      res.status(401).send("User is not Authorized");
    }
    else {
        next();
    }
};

module.exports = {adminAuth, userAuth} ;