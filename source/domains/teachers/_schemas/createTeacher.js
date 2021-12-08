export default {
    type:       'object',
    properties: {
        name: {
            type:       'object',
            properties: {
                first: {
                    type:      'string',
                    minLength: 5,
                },
            },
            required: [ 'first' ],
        },
        address: {
            type: 'string',
        },
    },
    required:             [ 'name', 'address' ],
    additionalProperties: false,
};
