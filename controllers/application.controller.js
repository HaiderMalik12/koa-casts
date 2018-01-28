/**
 * Created by haidermalik504 on 1/27/18.
 */
module.exports = {

    /**
     *@api {post} /applications
     *@apiGroup Applications
     * @apiName CreateApplications
     * @apiSuccess {Object} Application  A newly created Application object
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:4000/application
     * @apiDescription LoggedIn user can apply for the Job
     * @apiHeader {String} Authorization  JWT Authorization header
     * @apiHeaderExample {json} Request Authorization Header
     * {
     *  "authorization" : "jkahdkjashdk324324342"
     * }
     * @apiParam {String} [firstName]
     * @apiParam {String} [lastName]
     * @apiParam {String} [email]
     * @apiParam {Number} [JobId]
     */
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