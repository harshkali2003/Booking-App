function RoleAuthenticator(...allowedRoles) {
    return (req , resp , next) => {
        if(!req?.user || !req?.user.role){
            return next(new Error("Login first"))
        }

        if(!allowedRoles.includes(req?.user.role)){
            return next(new Error("Not Authorized"))
        }

        next();
    }
}

module.exports = RoleAuthenticator;