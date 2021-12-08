import Ajv from 'ajv';

export const validator = (schema) => (req, res, next) => {
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schema);
    const valid = validate(req.body);

    if (valid) {
        next();
    } else {
        res.status(400).json({ data: validate.errors.map(({ message }) => message) });
    }
};
