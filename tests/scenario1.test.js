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

const updatedPerson = {
  name: 'Sasha',
  age: 25,
};

let id = '';

describe('Scenarios 1', () => {
  test('GET get all person. Should be get status 200 and empty array', async () => {
    const response = await fetch(`${baseUrl}/person`);
    const body = await response.json();
    expect(response.status).toEqual(200);
    expect(body).toEqual([]);
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

  test('GET person by id. Should be get status 200 and person this same id', async () => {
    const response = await fetch(`${baseUrl}/person/${id}`);
    const body = await response.json();
    expect(response.status).toEqual(200);
    const expectedPerson = {
      id: id,
      name: person.name,
      age: person.age,
      hobbies: person.hobbies,
    };
    expect(body).toEqual(expectedPerson);
  });

  test('PUT update person. Should be get status 200 and updated person', async () => {
    const response = await fetch(`${baseUrl}/person/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPerson),
    });
    const body = await response.json();
    const expectedPerson = {
      id: id,
      name: updatedPerson.name,
      age: updatedPerson.age,
      hobbies: person.hobbies,
    };
    expect(response.status).toEqual(200);
    expect(body).toEqual(expectedPerson);
  });

  test('DELETE delete person by id. Should be get status 204', async () => {
    const response = await fetch(`${baseUrl}/person/${id}`, {
      method: 'DELETE',
    });
    expect(response.status).toEqual(204);
  });

  test('GET no existing person by id. Should be get status 404 and message', async () => {
    const response = await fetch(`${baseUrl}/person/${id}`);
    const message = await response.text();
    expect(response.status).toEqual(404);
    expect(message).toEqual(`404 Person with id: "${id}" is not found`);
  });
});
