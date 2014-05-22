# Maps to: http://highscores_api.meteor.com/api/get_highscores
# usage: jQuery.get('api/get_highscores').success(function(response){console.log(response)})
RESTstop.add "get_highscores",
method: "GET",
-> #start of anonymous function
    # Get me some data in an array
    array = Highscores.find({}, # This doesn't work. Any idea why?
      sort:
        score: -1
    ).fetch()
    # coffeelicious for loops
    for post, index in array
      post
     #last thing in coffeescript is always returned. Here an array of posts is generated then returned:
     
     #compiles to this
    #var _results = [];
    #for (index = _i = 0, _len = array.length; _i < _len; index = ++_i) {
      #post = array[index];
      #_results.push(post);
    #}
    #return _results;
 #
