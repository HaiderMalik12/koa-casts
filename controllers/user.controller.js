const UtilService = require('../services/util.service');

module.exports = {

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
                ctx.body = user;
            } else {
                ctx.throw(500, 'invalid password');
            }


        }
        catch (err) {
            ctx.throw(500, err);
        }
    }
};