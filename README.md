  # Simple-crud-api


  1. **Usage**:
    Before run app you need install: `npm install`
    Run app this watch: `npm run start`
    Build and run app in development mode: `npm run start:dev`
    Build and run app in production mode: `npm run start:prod`
    Run test: `npm run test`
    Run test:coverage: `npm run test:coverage`

  ***App to run on url: `http://localhost:3000/person`***

  2. **API methods**:
      * **GET** `/person` return all persons;
      * **GET** `/person/${personId}` person with corresponding `personId`
      * **POST** `/person` is used to create record about new person and store it in database
      * **PUT** `/person/${personId}` is used to update record about existing person
      * **DELETE** `/person/${personId}` is used to delete record about existing person from database

    *`personId` is `uuid`;
    For example: `http://localhost:3000/person/07fcec76-02aa-465f-92e4-419be17e92cb`

  3. **Persons are stored as `objects` that have following properties:**
      * `id` — unique identifier (`string`, `uuid`) generated on server side
      * `name` — person's name (`string`, **required**)
      * `age` — person's age (`number`, **required**)
      * `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)

      For example: `{"name": "Yra", "age": 25, "hobbies": ["hokey", "football", "bike" ]}`