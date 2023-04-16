import Joi from 'joi';
import sanitizeObjects from '../helpers/sanitizeObjects.js';

export const validUser = (req, res, next) => {
    const { email, password, fullname } = sanitizeObjects(req.body);

    const schema = Joi.object({
        email: Joi.string().email().trim().required(),
        password: Joi.string().alphanum().trim().required(),
        fullname: Joi.string().trim().required()
    });

    const { error } = schema.validate({ email, password, fullname }, { abortEarly: false });

    if (error) {
        res.status(400).json({
            message: 'Invalid body!',
            error: error.details[0].message
        });
    }

    req.body = { email, password, fullname };

    return next();
};
