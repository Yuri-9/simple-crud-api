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
let incorrectId = '2c105654-dc63-4143-8c09-e6823';

describe('Scenarios 3', () => {
  test('PUT update person with incorrect id. Should be get status 404 and message', async () => {
    const response = await fetch(`${baseUrl}/person/${incorrectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPerson),
    });
    const message = await response.text();

    expect(response.status).toEqual(400);
    expect(message).toEqual(`400 Id "${incorrectId}" is not validate`);
  });

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

  test('GET get all person. Should be get status 200 and array of persons this length 2 and different id ', async () => {
    const response = await fetch(`${baseUrl}/person`);
    const body = await response.json();
    expect(response.status).toEqual(200);
    expect(body.length).toEqual(2);
    const idFirstPerson = body[0].id;
    const idSecondPerson = body[1].id;
    expect(idFirstPerson !== idSecondPerson).toBeTruthy();
  });
});
