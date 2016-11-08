const fs = require('fs')
const pokemon = require('./data.json')
const request = require('request')
const poketwit = []
var length = pokemon.length
var i = -1;
const fetch = () => {
  if (poketwit.length === length) {
    fs.writeFileSync('./twitpoke.json',JSON.stringify(poketwit))
    console.log('all pokemon catched');
    return
  }
  var data = {}

i = i + 1;
console.log('catching '+i);
request('http://loklak.org/api/user.json?screen_name='+pokemon[i].name,(err, res, body) => {
  try {
    body = JSON.parse(body)
    data = {}
    if (body.user === undefined) {
      data.handleExist = false
    } else {
      data.handleExist = true
      description=""
      if (body.user.description=="") {
        description = 'description not available'
      }else {
        description = body.user.description
      }
      user = {
        description: description,
        following: body.user.friends_count,
        followers: body.user.followers_count,
        tweets: body.user.statuses_count
      }
      data.user = user
    }
    data.name = pokemon[i].name
    data.img= pokemon[i].ThumbnailImage
    poketwit.push(data)
  } catch (e) {
    console.log("something went wrong at "+ i);
    length = length -1;
  } finally {
    fetch()
  }


})

}
fetch()
