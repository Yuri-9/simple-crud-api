const isUuid = require('../utils/isUuid');
const parsePathName = require('../utils/parsePathName');
const validateObject = require('../utils/validateObject');
const schemaValidateParson = require('../repositories/schemaValidateParson');
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
        return {
          status: STATUS_CODE.BAD_REQUEST,
          body: `${STATUS_CODE.BAD_REQUEST} Id "${id}" is not validate`,
        };
      }

      const foundPerson = await this.persons.getPersonsById(id);

      if (!foundPerson) {
        return {
          status: STATUS_CODE.NOT_FOUND,
          body: `${STATUS_CODE.NOT_FOUND} Person with id: "${id}" is not found`,
        };
      }

      if (foundPerson) {
        return { status: STATUS_CODE.OK, body: JSON.stringify(foundPerson) };
      }
    }
    if (path === 'person') {
      const persons = await this.persons.getPersons();
      return { status: STATUS_CODE.OK, body: JSON.stringify(persons) };
    }
  }

  async post(pathFull, data) {
    const { path, id, numberPathItem } = parsePathName(pathFull);

    const objData = JSON.parse(data);

    const { isValidate, resultValidate } = validateObject(objData, schemaValidateParson);

    if (!isValidate) {
      const message1 = resultValidate.notExistRequired
        ? `Field: "${resultValidate.notExistRequired}" is missing`
        : '';
      const message2 = resultValidate.uncorrectedType
        ? `Field: "${resultValidate.uncorrectedType}" is wrong type`
        : '';
      return {
        status: STATUS_CODE.BAD_REQUEST,
        body: `${STATUS_CODE.BAD_REQUEST} ${message1} ${message2}`,
      };
    }

    if (path === 'person' && !id) {
      const newPerson = await this.persons.createPerson(objData);
      return { status: STATUS_CODE.OK_CREATE, body: JSON.stringify(newPerson) };
    }

    if (numberPathItem > MAX_NUMBER_PATH_ITEM || path !== 'person' || id) {
      return {
        status: STATUS_CODE.NOT_FOUND,
        body: `${STATUS_CODE.NOT_FOUND}. Url ${pathFull} is not found`,
      };
    }
  }

  async put(pathFull, data) {
    const { path, id, numberPathItem } = parsePathName(pathFull);

    const objData = JSON.parse(data);

    if (numberPathItem > MAX_NUMBER_PATH_ITEM || path !== 'person' || !id) {
      return {
        status: STATUS_CODE.NOT_FOUND,
        body: `${STATUS_CODE.NOT_FOUND}. Url ${pathFull} is not found`,
      };
    }

    if (path === 'person' && id) {
      if (!isUuid(id)) {
        return {
          status: STATUS_CODE.BAD_REQUEST,
          body: `${STATUS_CODE.BAD_REQUEST} Id "${id}" is not validate`,
        };
      }

      const foundPerson = await this.persons.getPersonsById(id);

      if (!foundPerson) {
        return {
          status: STATUS_CODE.NOT_FOUND,
          body: `${STATUS_CODE.NOT_FOUND} Person with id: "${id}" is not found`,
        };
      }

      if (foundPerson) {
        const updatedPerson = await this.persons.updatePerson(id, objData);
        return { status: STATUS_CODE.OK, body: JSON.stringify(updatedPerson) };
      }
    }
  }

  async delete(pathFull) {
    const { path, id, numberPathItem } = parsePathName(pathFull);

    if (numberPathItem > MAX_NUMBER_PATH_ITEM || path !== 'person' || !id) {
      return {
        status: STATUS_CODE.NOT_FOUND,
        body: `${STATUS_CODE.NOT_FOUND}. Url ${pathFull} is not found`,
      };
    }

    if (path === 'person' && id) {
      if (id === 'all') {
        await this.persons.deleteAllPersons();
        return {
          status: STATUS_CODE.OK_DELETE,
          body: `${STATUS_CODE.OK_DELETE} Delete all person`,
        };
      }

      if (!isUuid(id)) {
        return {
          status: STATUS_CODE.BAD_REQUEST,
          body: `${STATUS_CODE.BAD_REQUEST} Id "${id}" is not validate`,
        };
      }

      const foundPerson = await this.persons.getPersonsById(id);

      if (!foundPerson) {
        return {
          status: STATUS_CODE.NOT_FOUND,
          body: `${STATUS_CODE.NOT_FOUND} Person with id: "${id}" is not found`,
        };
      }

      if (foundPerson) {
        await this.persons.deletePerson(id);
        return { status: STATUS_CODE.OK_DELETE, body: '' };
      }
    }
  }
}

module.exports = Router;
