const fetch = require('cross-fetch');

const baseUrl = 'http://localhost:3000';

beforeAll(async () => {
  await fetch(`${baseUrl}/person/all`, {
    method: 'DELETE',
  });
});

const person = {
  name: 'Yra',
  age: 19,
  hobbies: ['null', 'football', 'bike'],
  id: 6565, // fake
};

const incorrectTypePerson = {
  name: 1,
};

const incorrectPerson = {
  name: 'Yra',
  hobbies: ['null', 'football', 'bike'],
  id: 6565, // fake
};

let id = '';
let fakeId = '2c105654-dc63-4143-8c09-e6823c686076';
let incorrectId = '2c105654-dc63-4143-8c09-e6823';

describe('Scenarios 2', () => {
  test('GET get all person. Should be get status 200 and empty array', async () => {
    const response = await fetch(`${baseUrl}/person`);
    const body = await response.json();
    expect(response.status).toEqual(200);
    expect(body).toEqual([]);
  });

  test('DELETE delete person by no existing id. Should be get status 404', async () => {
    const response = await fetch(`${baseUrl}/person/${fakeId}`, {
      method: 'DELETE',
    });
    const message = await response.text();
    expect(response.status).toEqual(404);
    expect(message).toEqual(`404 Person with id: "${fakeId}" is not found`);
  });

  test('POST create person without required field. Should be get status 400 and message', async () => {
    const response = await fetch(`${baseUrl}/person`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(incorrectPerson),
    });
    const message = await response.text();

    expect(response.status).toEqual(400);
    expect(message).toEqual('400 Field: "age" is missing ');
  });

  test('POST create person. Should be create person and get status 201 and the same person', async () => {
    const response = await fetch(`${baseUrl}/person`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    });
    const body = await response.json();
    id = body.id;
    const expectedPerson = {
      id: id,
      name: person.name,
      age: person.age,
      hobbies: person.hobbies,
    };
    expect(response.status).toEqual(201);
    expect(body).toEqual(expectedPerson);
  });

  test('PUT update person with incorrect type field. Should be get status 400 and message', async () => {
    const response = await fetch(`${baseUrl}/person/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(incorrectTypePerson),
    });
    const message = await response.text();

    expect(response.status).toEqual(400);
    expect(message).toEqual('400 Field: "name" is wrong type');
  });

  test('DELETE delete person by incorrect id. Should be get status 400 and message', async () => {
    const response = await fetch(`${baseUrl}/person/${incorrectId}`, {
      method: 'DELETE',
    });
    const message = await response.text();

    expect(response.status).toEqual(400);
    expect(message).toEqual(`400 Id "${incorrectId}" is not validate`);
  });
});
