const { randomUUID } = require('crypto');

class Persons {
  constructor() {
    this.persons = [];
  }

  getPersons() {
    return Promise.resolve(this.persons);
  }

  getPersonsById(id) {
    const person = this.persons.find((person) => person.id === id);
    return Promise.resolve(person);
  }

  createPerson(data) {
    const currentData = {
      name: data.name,
      age: data.age,
      hobbies: data.hobbies,
    };
    const newPerson = {
      id: randomUUID(),
      ...currentData,
    };
    this.persons.push(newPerson);
    return Promise.resolve(newPerson);
  }

  updatePerson(id, data) {
    const person = this.persons.find((person) => person.id === id);

    if (person) {
      person.name = data.name || person.name;
      person.age = data.age || person.age;
      person.hobbies = data.hobbies || person.hobbies;
    }
    return Promise.resolve(person);
  }

  deletePerson(id) {
    const personsIndex = this.persons.findIndex((person) => person.id === id);
    if (personsIndex < 0) return Promise.reject(new Error('Category not found'));
    this.persons.splice(personsIndex, 1);
    return Promise.resolve();
  }
  deleteAllPersons() {
    this.persons = [];
    return Promise.resolve();
  }
}

module.exports = Persons;
