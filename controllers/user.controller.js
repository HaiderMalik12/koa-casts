const UtilService = require('../services/util.service');
const JwtService = require('../services/jwt.service');

module.exports = {


    /**
     * @api {post} /signup
     * @apiGroup Users
     * @apiName signupUser
     * @apiParam {String} [email] user must need to provide the email
     * @apiParamExample {String} Request Params :
     * {
     *  "email"  : "test@email.com",
     *  "password" : "password12"
     * }
     * @apiParam {String} [password] user must need to provide the password
     * @apiSuccess {String} Msg Signup successful!
     * @apiSuccessExample {json} Singup-Success-Response :
     * HTTP/1.1 200Ok
     * {
     *  "msg" : "Signup Successful"
     * }
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:4000/signup
     * @apiDescription User can create new account
     */
    async signup(ctx){
        try {
            let {email, password} = ctx.request.body;

            if (!email) {
                ctx.throw(400, 'please provide the email')
            }
            if (!password) {
                ctx.throw(400, 'please provide the password')
            }

            const encryptedPassword = await UtilService.hashPassword(password);
            await ctx.db.User.create({
                email,
                password: encryptedPassword
            });
            ctx.body = 'Signup successful!';
        }
        catch (err) {
            ctx.throw(500, err);
        }

    },
    /**
     *@api {post} /login
     *@apiGroup Users
     * @apiName loginUser
     * @apiParam {String} [email] user must need to provide email
     * @apiParam {String} [password] user must need to provide password
     * @apiParamExample {String} Request Params :
     * {
     *  "email"  : "test@email.com",
     *  "password" : "password12"
     * }
     * @apiSuccess {Object} Token  A Json web token to acces proceted routes
     * @apiSuccessExample {json} Login Response:
     * {
     *  "token" : "XZADJHASGDJHASGDJHAGSDJAGSJDH"
     * }
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:4000/login
     * @apiDescription User can login to the system
     */
    async login(ctx){
        try {
            let {email, password} = ctx.request.body;

            if (!email) {
                ctx.throw(400, 'please provide the email')
            }
            if (!password) {
                ctx.throw(400, 'please provide the password')
            }

            const user = await ctx.db.User.findOne({
                where: {
                    email
                }
            });
            if (!user) {
                ctx.throw(500, 'unable to prcoess request');
            }

            const matched = UtilService.comparedPassword(password, user.password);
            if (matched) {

                //create a json webtoken for the user
                const token = JwtService.issue({
                    payload:{
                        user: user.id
                    }
                },'1 day');

                ctx.body = {token};

            } else {
                ctx.throw(500, 'invalid password');
            }


        }
        catch (err) {
            ctx.throw(500, err);
        }
    }
};