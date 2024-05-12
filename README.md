Node 22.1.0 verziót használtam
```npm i```
```npm run start```

Adatbázis:
```
docker run --name questionnaire-db -p 27017:27017 -e MONGO_INITDB_DATABASE=questionnaire mongo
mongorestore -d questionnaire example_data
```
