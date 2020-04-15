var express = require('express');
var router = express.Router();
const db = require("../model/helper");


function getUsers(req, res) {
  db("SELECT * FROM user;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
}

function getPeople(req, res) {
  db("SELECT * FROM person;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
}

function getRelationships(req, res) {
  db("SELECT * FROM relationship;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
}

// GET relationship listing
router.get("/relationship", getRelationships);


function getOneUser(req, res) {
  db(`SELECT * FROM user WHERE id=${res.params.id};`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
}

/* function getUser(req, res) {
  db(`select id from user where name="${req.body.name}";`)
  .then(results => {
    res.getOneUser(req, res);
    })
  .catch(err => res.status(500).send(err));
} */


// GET user listing
router.get("/user", getUsers);


// GET one user
router.get("/user/:id", function(req, res, next) {
  db(`SELECT * FROM user WHERE id=${req.params.id};`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});



// INSERT a new user into the DB
router.post("/user", function(req, res, next) {
  db(
    `INSERT INTO user (name, surname, email, birth) VALUES
    ('${req.body.name}', '${req.body.surname}', '${req.body.email}', '${req.body.birth}');`
  )
  .then(results => {
    getUsers(req, res);
  })
  .catch(err => res.status(500).send(err));
});


//UPDATE an user from the DB
router.put("/user/:id", function(req, res, next) {
  db(`UPDATE user set name='${req.body.name}', surname='${req.body.surname}', email='${req.body.email}', birth='${req.body.birth}'
  WHERE id=${req.params.id};`)
  .then(results => {
    if (results.error) {
      res.status(404).send({ error: results.error });
    } else {
      getUsers(req, res);
    }
  })
  .catch(err => res.status(500).send(err));
});

// DELETE an user from the DB
router.delete("/user/:id", function(req, res, next) {
  db(`DELETE from user WHERE id=${req.params.id};`)
    .then(results => {
      if (results.error) {
        res.status(404).send({ error: results.error });
      } else {
        getUsers(req, res);
      }
    })
    .catch(err => res.status(500).send(err));
});


// GET person listing
router.get("/person", getPeople);

// GET one person
router.get("/person/:id", function(req, res, next) {
  db(`SELECT * FROM person WHERE id=${req.params.id};`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// GET one person by user_id
router.get("/user/:id/person", function(req, res, next) {
  db(`SELECT * FROM person WHERE user_id=${req.params.id};`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});


// INSERT a new person into the DB
router.post("/person", function(req, res, next) {
  db(
    `INSERT INTO person (name, sex, age, image, date_of_birth, location, relationship_id, user_id) VALUES
    ('${req.body.name}', '${req.body.sex}', '${req.body.age}', '${req.body.image}', '${req.body.date_of_birth}', '${req.body.location}', '${req.body.relationship_id}', '${req.body.user_id}');`
  )
    .then(results => {
      if (results.error) {
        res.status(404).send({ error: results.error });
      } else {
        getPeople(req, res);
      }
    })
    .catch(err => res.status(500).send(err));
});

//UPDATE a person from the DB
router.put("/person/:id", function(req, res, next) {
  db(`UPDATE person set name='${req.body.name}', sex='${req.body.sex}', age='${req.body.age}', image='${req.body.image}', date_of_birth='${req.body.date_of_birth}', location='${req.body.location}', relationship_id='${req.body.relationship_id}', user_id='${req.body.user_id}'
  WHERE id=${req.params.id};`)
  .then(results => {
    if (results.error) {
      res.status(404).send({ error: results.error });
    } else {
      getPeople(req, res);
    }
  })
  .catch(err => res.status(500).send(err));
});

// DELETE a person from the DB
router.delete("/person/:id", function(req, res, next) {
  db(`DELETE from person WHERE id=${req.params.id};`)
    .then(results => {
      if (results.error) {
        res.status(404).send({ error: results.error });
      } else {
        getPeople(req, res);
      }
    })
    .catch(err => res.status(500).send(err));
});


// GET items listing
router.get('/items', function(req, res, next) {
  db("SELECT * FROM items;")
  .then(results => {
    res.send(results.data);
  })
  .catch(err => res.status(500).send(err));
});

// GET one item
router.get("/items/:id", function(req, res, next) {
  db(`SELECT * FROM items WHERE id=${req.params.id};`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// INSERT a new item into the DB
router.post("/items", function(req, res, next) {
  db(
    `INSERT INTO items (name, type, description, item_location) VALUES
    ('${req.body.name}', '${req.body.type}', '${req.body.description}', '${req.body.item_location}');`
  )
    .then(results => {
      if (results.error) {
        res.status(404).send({ error: results.error });
      } else {
        res.send({ body: results.data });
      }
    })
    .catch(err => res.status(500).send(err));
});

//UPDATE an item from the DB
router.put("/items/:id", function(req, res, next) {
  db(`UPDATE items set name='${req.body.name}', type='${req.body.type}', description='${req.body.description}', item_location='${req.body.item_location}'
  WHERE id=${req.params.id};`)
  .then(results => {
    if (results.error) {
      res.status(404).send({ error: results.error });
    } else {
      res.send({ body: results.data });
    }
  })
  .catch(err => res.status(500).send(err));
});

// DELETE an item from the DB
router.delete("/items/:id", function(req, res, next) {
  db(`DELETE from items WHERE id=${req.params.id};`)
    .then(results => {
      if (results.error) {
        res.status(404).send({ error: results.error });
      } else {
        res.send({ body: results.data });
      }
    })
    .catch(err => res.status(500).send(err));
});

// GET location listing
router.get('/location', function(req, res, next) {
  db("SELECT * FROM location;")
  .then(results => {
    res.send(results.data);
  })
  .catch(err => res.status(500).send(err));
});

// GET one location
router.get("/location/:id", function(req, res, next) {
  db(`SELECT * FROM location WHERE id=${req.params.id};`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// INSERT a new location into the DB
router.post("/location", function(req, res, next) {
  db(
    `INSERT INTO location (city, country) VALUES
    ('${req.body.city}', '${req.body.country}');`
  )
    .then(results => {
      if (results.error) {
        res.status(404).send({ error: results.error });
      } else {
        res.send({ body: results.data });
      }
    })
    .catch(err => res.status(500).send(err));
});

//UPDATE an location from the DB
router.put("/location/:id", function(req, res, next) {
  db(`UPDATE location set city='${req.body.city}', country='${req.body.country}'
  WHERE id=${req.params.id};`)
  .then(results => {
    if (results.error) {
      res.status(404).send({ error: results.error });
    } else {
      res.send({ body: results.data });
    }
  })
  .catch(err => res.status(500).send(err));
});

// DELETE a location from the DB
router.delete("/location/:id", function(req, res, next) {
  db(`DELETE from location WHERE id=${req.params.id};`)
    .then(results => {
      if (results.error) {
        res.status(404).send({ error: results.error });
      } else {
        res.send({ body: results.data });
      }
    })
    .catch(err => res.status(500).send(err));
});

// GET parents listing
router.get('/parents', function(req, res, next) {
  db("SELECT * FROM parents;")
  .then(results => {
    res.send(results.data);
  })
  .catch(err => res.status(500).send(err));
});

// GET parents
router.get("/parents/:id", function(req, res, next) {
  db(`SELECT * FROM parents WHERE id=${req.params.id};`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// INSERT new parents into the DB
router.post("/parents", function(req, res, next) {
  db(
    `INSERT INTO parents (name, parent1, parent2) VALUES
    ('${req.body.name}', '${req.body.parent1}', '${req.body.parent2}');`
  )
    .then(results => {
      if (results.error) {
        res.status(404).send({ error: results.error });
      } else {
        res.send({ body: results.data });
      }
    })
    .catch(err => res.status(500).send(err));
});

//UPDATE parents from the DB
router.put("/parents/:id", function(req, res, next) {
  db(`UPDATE parents set name='${req.body.name}', parent1='${req.body.parent1}, parent2='${req.body.parent2}'
  WHERE id=${req.params.id};`)
  .then(results => {
    if (results.error) {
      res.status(404).send({ error: results.error });
    } else {
      res.send({ body: results.data });
    }
  })
  .catch(err => res.status(500).send(err));
});

// DELETE parents from the DB
router.delete("/parents/:id", function(req, res, next) {
  db(`DELETE from parents WHERE id=${req.params.id};`)
    .then(results => {
      if (results.error) {
        res.status(404).send({ error: results.error });
      } else {
        res.send({ body: results.data });
      }
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
