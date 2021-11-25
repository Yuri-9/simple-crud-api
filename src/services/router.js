const isUuid = require('../utils/isUuid');
const parsePathName = require('../utils/parsePathName');
const STATUS_CODE = require('../utils/statusCode');

class Router {
  constructor(persons) {
    this.persons = persons;
  }

  async get(req) {
    const { path, id } = parsePathName(req);

    if (path === 'person' && id) {
      const result = await this.persons.getPersonsById(id);

      if (!isUuid(id)) {
        return { status: STATUS_CODE.BAD_REQUEST, body: 'Id is not validate' };
      }

      if (!result) {
        return { status: STATUS_CODE.NOT_FOUND, body: `Person with ${id} is not found` };
      }

      if (result) {
        return { status: STATUS_CODE.OK, body: JSON.stringify(result) };
      }
    }
    if (path === 'person') {
      const result = await this.persons.getPersons();
      return { status: STATUS_CODE.OK, body: JSON.stringify(result) };
    }
  }

  post() {}

  put() {}

  delete() {}
}

module.exports = Router;
