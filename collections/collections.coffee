# This is a bit fancy, but ensures that Highscores is available on the client and server

root = global ? window

root.Highscores = new Meteor.Collection("highscores")
