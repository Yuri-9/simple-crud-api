const isUuid = require('../utils/isUuid');
const parsePathName = require('../utils/parsePathName');
const STATUS_CODE = require('../utils/statusCode');
const MAX_NUMBER_PATH_ITEM = 3;

class Router {
  constructor(persons) {
    this.persons = persons;
  }

  async get(pathFull) {
    const { path, id, numberPathItem } = parsePathName(pathFull);
    if (numberPathItem > MAX_NUMBER_PATH_ITEM || path !== 'person') {
      return {
        status: STATUS_CODE.NOT_FOUND,
        body: `${STATUS_CODE.NOT_FOUND}. Url ${pathFull} is not found`,
      };
    }
    if (path === 'person' && id) {
      if (!isUuid(id)) {
        return { status: STATUS_CODE.BAD_REQUEST, body: `Id "${id}" is not validate` };
      }

      const finddedPerson = await this.persons.getPersonsById(id);

      if (!finddedPerson) {
        return { status: STATUS_CODE.NOT_FOUND, body: `Person with ${id} is not found` };
      }

      if (finddedPerson) {
        return { status: STATUS_CODE.OK, body: JSON.stringify(finddedPerson) };
      }
    }
    if (path === 'person') {
      const persons = await this.persons.getPersons();
      return { status: STATUS_CODE.OK, body: JSON.stringify(persons) };
    }
  }

  post() {}

  put() {}

  async delete(pathFull) {
    const { path, id, numberPathItem } = parsePathName(pathFull);

    if (numberPathItem > MAX_NUMBER_PATH_ITEM || path !== 'person' || !id) {
      return {
        status: STATUS_CODE.NOT_FOUND,
        body: `${STATUS_CODE.NOT_FOUND}. Url ${pathFull} is not found`,
      };
    }

    if (path === 'person' && id) {
      if (!isUuid(id)) {
        return { status: STATUS_CODE.BAD_REQUEST, body: `Id "${id}" is not validate` };
      }

      const finddedPerson = await this.persons.getPersonsById(id);

      if (!finddedPerson) {
        return { status: STATUS_CODE.NOT_FOUND, body: `Person with id: "${id}" is not found` };
      }

      if (finddedPerson) {
        this.persons.deletePerson(id);
        return { status: STATUS_CODE.OK_DELETE, body: '' };
      }
    }
  }
}

module.exports = Router;
