if Meteor.isClient then Highscores = new Meteor.Collection("highscores") 

if Meteor.isServer 
    Highscores = new Meteor.Collection("highscores")
    Meteor.startup ->

    # Meteor.call('removeAllPosts')
    # From the console, this will remove all stored posts.
    Meteor.methods removeAllPosts: ->
        Highscores.remove {}

    # Global configuration
    RESTstop.configure use_auth: false

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
    # Maps to: http://highscores_api.meteor.com/api/user_exists
    # usage: jQuery.get('api/user_exists/NotARealUr2').success(function(response){console.log(response)})
    RESTstop.add "user_exists/:user",
    method: "GET",
    ->
        a = {}
        a.exists = if Highscores.find(user: @params.user) > 0 then true else false
        a

    # Maps to, for example: http://highscores_api.meteor.com/api/post_higscore
    # usage: jQuery.post('api/post_highscore',{user:"string",score:111})
    RESTstop.add "post_highscore",
    method: "POST",
     ->
        user = @params.user
        score = Number(@params.score)
        id_to_update = false
        if user and score
          # Does this user exist already?
            collection = Highscores.find(user: user).fetch()
            id_to_update = collection[0]._id  unless collection.length is 0

            # If yes, update them. If no, create them.
            if id_to_update
                Highscores.update
                    _id: id_to_update,
                    user: user
                    score: score
            else
                Highscores.insert
                    user: user
                    score: score
            "OK" #this will be returned