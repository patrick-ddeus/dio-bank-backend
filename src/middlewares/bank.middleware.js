import Joi from 'joi';

export const validBalance = (req, res, next) => {
    const { balance } = req.body;

    const schema = Joi.object({
        balance: Joi.number().required()
    });

    const { error } = schema.validate({ balance });

    if (error) {
        return res.status(400).json({
            message: 'Invalid body!',
            error: error.details[0].message
        });
    }

    return next();
};
