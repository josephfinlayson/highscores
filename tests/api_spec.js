var frisby = require('frisby');
var root_url = "http://localhost:3000";
var api = "/api/";
var root_api = root_url + api;


frisby.create('Get Highscores')
  .get(root_api + "get_highscores")
  .expectStatus(200)
  .expectHeaderContains('content-type', 'text/json')
  .inspectJSON()
  .expectJSONTypes("1",
   {
    user: String,
    score: Number,
    _id: String
  })
.toss();


frisby.create('Post Highscore')
  .get(root_api + "get_highscores")
  .expectStatus(200)
  .expectHeaderContains('content-type', 'text/json')
  .inspectJSON()
  .expectJSONTypes("1",
   {
    user: String,
    score: Number,
    _id: String
  })
.toss();



frisby.create('Update Highscore')
  .get(root_api + "get_highscores")
  .expectStatus(200)
  .expectHeaderContains('content-type', 'text/json')
  .inspectJSON()
  .expectJSONTypes("1",
   {
    user: String,
    score: Number,
    _id: String
  })
.toss();


frisby.create('Check unique user')
  .get(root_api + "get_highscores")
  .expectStatus(200)
  .expectHeaderContains('content-type', 'text/json')
  .inspectJSON()
  .expectJSONTypes("1",
   {
    user: String,
    score: Number,
    _id: String
  })
.toss();