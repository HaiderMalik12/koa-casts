/**
 * Created by haidermalik504 on 1/27/18.
 */
module.exports = {
    async create(ctx){

        try {

            const candidate = await ctx.db.Candidate.create({
                firstName: ctx.request.body.firstName,
                lastName: ctx.request.body.lastName,
                email: ctx.request.body.email
            });

            ctx.body = await ctx.db.Application.create({
                JobId: ctx.request.body.jobId,
                CandidateId: candidate.id
            });
        }
        catch (err) {
            ctx.throw(500, err);
        }
    }
};