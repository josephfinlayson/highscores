# Maps to: http://highscores_api.meteor.com/api/get_highscores
# usage: jQuery.get('api/get_highscores').success(function(response){console.log(response)})
RESTstop.add "get_highscores",
method: "GET",
-> #start of anonymous function
    returnData = {}

    # Get me some data in an array
    array = Highscores.find({}, # This doesn't work. Any idea why?
      sort:
        score: -1
    ).fetch()
    # coffeelicious for loops
    for post, index in array
      returnData[index] = post
    returnData #last thing in coffeescript is always returned
