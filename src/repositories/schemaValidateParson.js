const schemaValidateParson = {
  name: {
    type: 'string',
    required: true,
  },
  age: {
    type: 'number',
    required: true,
  },
  hobbies: {
    type: ['string'],
    required: true,
  },
};

module.exports = schemaValidateParson;
