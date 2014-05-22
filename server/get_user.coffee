# Maps to: http://highscores_api.meteor.com/api/user_exists
# usage: jQuery.get('api/user_exists/NotARealUr2').success(function(response){console.log(response)})
RESTstop.add "user_exists/:user",
method: "GET",
->
    a = {}
    a.exists = if Highscores.find(user: @params.user) > 0 then true else false 
    a
    
    #tricky bit compiles to:
    #a.exists = Highscores.find({
        #user: this.params.user
    #}) > 0 ? true : false;


