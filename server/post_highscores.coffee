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
            c = Highscores.update
                _id: id_to_update,
                    user: user
                    score: score
            console.log c
        else
            c = Highscores.insert
                user: user
                score: score
            console.log c
        "OK" #this will be returned
    else
        "Not OK"