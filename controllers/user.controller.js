module.exports = {

    async signup(ctx){
        try{
            let {email, password} = ctx.request.body;

            if(!email){
                ctx.throw(400, 'please provide the email')
            }
            if(!password){
                ctx.throw(400, 'please provide the password')
            }

            ctx.body = await ctx.db.User.create({
                email,
                password
            });
        }
        catch (err){
            ctx.throw(500, err);
        }

    }
};