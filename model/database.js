require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS || "root",
  database: DB_NAME || "family tree",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");


  let sql =
    "create table parents (id int auto_increment primary key, name text null, parent1 text null, parent2 text null); create table relationship (id int auto_increment primary key, type text null); create table user (name text null, surname text null, email text null, birth text null, id int auto_increment primary key); create table person (id int auto_increment primary key, name text null, sex text null, age int null, image text null, date_of_birth text null, location text null, relationship_id int  null, user_id int  null, constraint person_relationship_id_fk foreign key (relationship_id) references relationship (id), constraint person_user_id_fk foreign key (user_id) references user (id)); create table items (id int auto_increment primary key, name text null, type text null, description text null, item_location text null, person_id int  null,constraint items_person_id_fkforeign key (person_id) references person (id));"

  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table creations was successful!");

  });

  con.end();
});
