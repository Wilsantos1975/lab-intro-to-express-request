const pokemon = require("./models/pokemon.json");
const express = require("express");
const app = express();


app.get("/", (req, res) => {
  res.send("Welcome 99 Pokemon");
});

app.get("/:verb/:adjective/:noun", (req, res) => {
  const { verb, adjective, noun } = req.params;
  res.send(
    `Congratulations on starting a new project called ${verb}-${adjective}-${noun}!`
  );
});

app.get("/bugs", (req, res) => {
  const number_of_bugs = 99;
  res.send(
    `${number_of_bugs} little bugs in the code <br> <h3><a href="/bugs/${
      number_of_bugs + 2
    }">${"pull one down, patch it around"}</a></h3>`
  );
});

app.get("/bugs/:number_of_bugs", (req, res) => {
  const { number_of_bugs } = req.params;
  let number = parseInt(number_of_bugs);
  if (number < 200) {
    res.send(`      

        <h1>${number} little bugs in the code</h1>
        <a href="/bugs/${(number += 2)}">Pull one down, patch it around</a>
        `);
  } else {
    res.send(`      
        Too many bugs!! Start over!
        <a href="/bugs/">Pull one down, patch it around</a>                
        `);
  }
});



app.get("/pokemon", (req, res) => {
  res.send(pokemon);
});



app.get("/pokemon/search", (req, res) => {      
    const { name } = req.query;
    const searchPokemon = pokemon.find((pokemon) => pokemon.name.toLowerCase() === name.toLowerCase());
    if(searchPokemon) {
        res.send([searchPokemon]);
    }else {
        res.send([])
    }
  }
  );

  app.get("/pokemon/:index", (req,res) => {
    const { index } = req.params

        if(pokemon[index]){

            res.send(pokemon[index]);
        }else {
            res.send("Sorry, no pokemon found at " + index);

        }
  })

app.get("*", (req, res) => {
    const { index } = req.params
  res.status(404).send(`Sorry, no pokemon found at ${index}`);
});

module.exports = app;
