module.exports = {
    async create(ctx){
        try {

            if (!ctx.request.body.title) {
                ctx.throw(400, 'please provide the job title')
            }

            if (!ctx.request.body.CompanyId) {
                ctx.throw(400, 'please provide the  CompanyId')
            }

            ctx.body = await ctx.db.Job.create({
                title: ctx.request.body.title,
                CompanyId: ctx.request.body.CompanyId,
            });


        }
        catch (err) {
            ctx.throw(500, err);
        }
    }
};