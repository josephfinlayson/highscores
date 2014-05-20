if (Meteor.isClient) {
    Highscores = new Meteor.Collection('highscores');
}




if (Meteor.isServer) {
    Highscores = new Meteor.Collection('highscores');
    Meteor.startup(function() {

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
        var a  = {}
        var n = 0
        //iterates through collections to return only data .fetch() should also do this
        Highscores.find({}).forEach(function (post) {
            a[n] = post;
            n++
        });
        return a;
    });

    // Maps to, for example: http://highscores_api.meteor.com/api/post_higscore
    // usage: jQuery.post('api/post_highscore',{user:"string",score:111})
    RESTstop.add('post_highscore', {
        method: 'POST'
    }, function() {

        user = this.params.user;
        score = this.params.score;
        if (user && score) {
            Highscores.insert({
                user: user,
                score: score
            });

        }

    });


}
