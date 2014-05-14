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

    // Maps to: /api/get_user
    RESTstop.add('get_highscores', {
        method: 'GET'
    }, function() {
        a  = {}
        n = 0
        Highscores.find({}).forEach(function (post) {
            a[n] = post;
            n++
        });
        return a;
    });

    // Maps to, for example: /api/get_num/42
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
