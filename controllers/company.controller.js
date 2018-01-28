module.exports = {


    /**
     *@api {post} /companies
     *@apiGroup Companies
     * @apiName CreateCompany
     * @apiSuccess {Object} Company  A newly created Company Object
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:4000/companies
     * @apiDescription LoggedIn user can register new Company
     * @apiHeader {String} Authorization  JWT Authorization header
     * @apiHeaderExample {json} Request Authorization Header
     * {
     *  "authorization" : "jkahdkjashdk324324342"
     * }
     * @apiParam {String} [name]
     * @apiParam {String} [city]
     * @apiParam {String} [address]
     * @apiParam {Number} [UserId]
     */
    async create(ctx){

        try {
            ctx.body = await ctx.db.Company.create({
                name: ctx.request.body.name,
                city: ctx.request.body.city,
                address: ctx.request.body.address,
                UserId: ctx.state.user
            });

        }
        catch (err) {
            ctx.throw(500, err);
        }

    },
    /**
     *@api {get} /companies
     *@apiGroup Companies
     * @apiName GetCompany
     * @apiSuccess {Object[]} Company List of Companies with Jobs
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:4000/companies
     * @apiDescription LoggedIn user can view all the companies
     * @apiHeader {String} Authorization  JWT Authorization header
     * @apiHeaderExample {json} Request Authorization Header
     * {
     *  "authorization" : "jkahdkjashdk324324342"
     * }
     */
    async find(ctx){
        try {
            ctx.body = await ctx.db.Company.findAll({
                UserId: ctx.state.user,
                include: [
                    {
                        model: ctx.db.Job

                    }
                ]

            });

        }
        catch (err) {
            ctx.throw(500, err);
        }
    },
    async findOne(ctx){
        try {

            const company = await ctx.db.Company.findOne({
                id: ctx.params.id
            });
            if (!company) {
                ctx.throw(404, 'company id is invalid');
            }
            ctx.body = company;
        }
        catch (err) {
            ctx.throw(500, err)
        }
    },
    async destroy(ctx){
        try {

            const results = await ctx.db.Company.destroy({
                where: {
                    id: ctx.params.id
                }
            });

            results === 0 ? ctx.throw(500, 'invalid id provided') : ctx.body = `company is deleted with id ${ctx.params.id}`;

        }
        catch (err) {
            ctx.throw(500, err)
        }
    },
    async update(ctx){
        try {

            const results = await ctx.db.Company.update({
                name: ctx.request.body.name,
                city: ctx.request.body.city,
                addres: ctx.request.body.address
            }, {
                where: {
                    id: ctx.params.id
                }
            });

            results === 0 ? ctx.throw(500, 'invalid id provided') : ctx.body = `company is updated with id ${ctx.params.id}`;

        }
        catch (err) {
            ctx.throw(500, err)
        }
    }
};