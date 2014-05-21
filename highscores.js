if (Meteor.isClient) {
    Highscores = new Meteor.Collection('highscores');
}


if (Meteor.isServer) {
    Highscores = new Meteor.Collection('highscores');
    Meteor.startup(function() {
        return Meteor.methods({
            // Meteor.call('removeAllPosts')
            // From the console, this will remove all stored posts.
            removeAllPosts: function() {
                return Highscores.remove({});
            }
        })
    });

    // Global configuration
    RESTstop.configure({
        use_auth: false
    });

    // Maps to: http://highscores_api.meteor.com/api/get_highscores
    // usage: jQuery.get('api/get_highscores').success(function(response){console.log(response)})
    RESTstop.add('get_highscores', {
        method: 'GET'
    }, function() {
        var a = {}
        var n = 0
        //iterates through collections to return only data .fetch() should also do this
        Highscores.find({}, {
            sort: {
                score: -1
            }
        }).forEach(function(post) {
            a[n] = post;
            n++
        });
        console.log
        return a;
    });

    // Maps to: http://highscores_api.meteor.com/api/user_exists
    // usage: jQuery.get('api/user_exists/NotARealUr2').success(function(response){console.log(response)})
    RESTstop.add('user_exists/:user', {
        method: 'GET'
    }, function() {
        var user = this.params.user;
        var a = {};
        a.exists = false;   
        var collection = Highscores.find({"user" : user});
        if (collection.count()>0) {
            a.exists = true;
        }
        return a;
    });



    // Maps to, for example: http://highscores_api.meteor.com/api/post_higscore
    // usage: jQuery.post('api/post_highscore',{user:"string",score:111})
    RESTstop.add('post_highscore', {
        method: 'POST'
    }, function() {
        var user = this.params.user;
        var score = Number(this.params.score);
        var id_to_update = false;
        
        if (user && score) {
            var collection = Highscores.find({"user" : user}).fetch();
            if (collection.length != 0) {
                id_to_update = collection[0]._id;
            }
            // inserts user only if the user does not already exist
            if (id_to_update) {
                Highscores.update({
                    _id: id_to_update
                }, {
                    user: user,
                    score: score
                });
            } else {
                Highscores.insert({
                    user: user,
                    score: score
                });
            }
        }
    });
}
