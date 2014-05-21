if Meteor.isServer 
    # From the console, this will remove all stored posts.
    Meteor.methods removeAllPosts: ->
        Highscores.remove {}
    #uncomment to remove all mosts
    # Meteor.call('removeAllPosts') 

    # Global configuration
    RESTstop.configure use_auth: false

