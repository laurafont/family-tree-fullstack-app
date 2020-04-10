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
    "create table user( name text null, surname text null, relationship text null, description text null, id int auto_increment primary key); create table location( id int auto_increment primary key, city text null, country text null); create table parents( id int auto_increment primary key, name text null, parent1 text null, parent2 text null ); create table person(id int auto_increment primary key, name text null, sex text null, age int null, location_id int null, parents_id int null, image_location text null, date_of_birth date null, constraint person_location_id_fk foreign key (location_id) references location (id), constraint person_parents_id_fk foreign key (parents_id) references parents (id) ); create table items(id int auto_increment primary key, name text null, type text null, description text null, item_location text null, person_id int null, constraint items_person_id_fk foreign key (person_id) references person (id));"

  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table creations was successful!");

  });

  con.end();
});
