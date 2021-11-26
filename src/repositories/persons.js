const { randomUUID } = require('crypto');

console.log(randomUUID());

class Persons {
  constructor() {
    this.persons = [
      {
        id: '07fcec76-02aa-465f-92e4-419be17e91cb',
        name: 'Yra1',
        age: 19,
        hobbies: ['sky', 'football', 'bike'],
      },
      {
        id: '07fcec76-02aa-465f-92e4-419be17e92cb',
        name: 'Yra2',
        age: 21,
        hobbies: ['sky', 'football'],
      },
    ];
    //   this.schema = {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     age: {
    //       type: Number,
    //       required: true,
    //     },
    //     hobbies: {
    //       type: Array,
    //       item: String,
    //       required: true,
    //     },
    //   };
    // }

    // static validatePerson(object, schema) {
    //   let errors = Object.keys(schema)
    //     .filter((key) => {
    //       return !schema[key](object[key]);
    //     })
    //     .map((key) => {
    //       return new Error(key + ' is invalid.');
    //     });

    //   if (errors.length > 0) {
    //     errors.forEach(function (error) {
    //       console.log(error.message);
    //     });
    //   } else {
    //     console.log('info is valid');
    //   }
  }

  getPersons() {
    return Promise.resolve(this.persons);
  }

  getPersonsById(id) {
    const person = this.persons.find((person) => person.id === id);
    return Promise.resolve(person);
  }

  deletePerson(id) {
    const personsIndex = this.persons.findIndex((person) => person.id === id);
    if (personsIndex < 0) return Promise.reject(new Error('Category not found'));
    this.persons.splice(personsIndex, 1);
    return Promise.resolve();
  }
}

module.exports = Persons;
