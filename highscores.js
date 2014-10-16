/**
* This is a simple app for scoring. Joe Finlayson wrote the basics, George Prichard elaborated.
*
* It's a meteor app, so get meteor installed first of all.
*
* You can run it in a browser by navigating to the directory in the terminal, and typing 'meteor'
*
* Post a high score from the javascript console with 
*      jQuery.post('api/post_highscore',{user:"string",score:111})
*
* Download all the highscores (json) by navigating to 
*      http://highscores_api.meteor.com/api/get_highscores
*
* Download a group (formatted nicely) with 
*      http://highscores_api.meteor.com/api/get_highscores   
*
*/



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
        var returnData = {};
        var n = 0;
        // Get me some data in an array
        array = Highscores.find({}, {sort: {score: -1}}).fetch();

        // Something doesn't like returning arrays (Meteor? RESTstop?). So, make in an object
        for (var i = 0; i < array.length; i++) {
            returnData[i] = array[i];
        }



        return returnData;
    });


    // Maps to: http://highscores_api.meteor.com/api/get_groupscores
    // usage: jQuery.get('api/get_groupscores/motorcontrol/george').success(function(response){console.log(response)})
    RESTstop.add('get_groupscores/:group/:user', {
        method: 'GET'
    }, function() { 
        var group = this.params.group;
        var user = this.params.user;
        var returnData = {};

        // Get me some data in an array
        array = Highscores.find({group : group}, {sort: {score: -1}}).fetch();

        var myPosition;
        var resultsWithPositions = {};

        // Find myself!
        for (var i = 0; i < array.length; i++) {
            if (array[i].user == user) {
                myPosition = (i+1);
            }
        }

        // If I'm not in the top 10, return the top 3 and the chaps either side of me
        if (myPosition > 8) {
            returnData[0] = array[0];
            returnData[1] = array[1];
            returnData[2] = array[2];

            // Mark their positions.
            for (var i = 0; i < 3; i ++) {
                returnData[i].pos = (i+1);
            }

            // Go 2 positions below
            var below = myPosition + 2;

            // In case that's not possible, go as much below as we can.
            if (below > array.length) {
                diff = below - array.length;
                below = below - diff;
            }

            // 2 positions above
            var above = below - 4;

            // Write the data.
            for (var i = above; i <= below; i ++) {
                console.log(i + "  " + (i-above) + "  " + (i-above+3));
                console.log(i + "/" + array.length + "  other pos " + (i-above + 3));
                returnData[i-above + 3] = array[i-1]; // We've been counting positions from 1
                returnData[i-above + 3].pos = (i+1);
            }
        } else {
        // If i am in the top 10, return them, or as many as i can.
            if (array.length > 10) {
                maxReturn = 10;
            } else {
                maxReturn = array.length;
            }
            for (var i = 0; i < maxReturn; i++) {
                returnData[i] = array[i];
                returnData[i].pos = (i+1);
            }
        }
        return returnData;
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
        var user = String(this.params.user);
        var score = Number(this.params.score);
        var group = String(this.params.group);
        var id_to_update = false;
        console.log("user: " + user + "  score: " + score);
        console.log("0");

        if (user && score) {
            console.log("1");
            // Does this user exist already?
            var collection = Highscores.find({"user" : user}).fetch();
            if (collection.length != 0) {
                id_to_update = collection[0]._id;
            }
            console.log("2");
            // If yes, update them. If no, create them.
            if (id_to_update) {
                Highscores.update({
                    _id: id_to_update
                }, {
                    user: user,
                    score: score,
                    group: group
                });
            } else {
                console.log("3");

                Highscores.insert({
                    user: user,
                    score: score,
                    group: group
                });
                console.log("4");
            }
        }
    });
}
