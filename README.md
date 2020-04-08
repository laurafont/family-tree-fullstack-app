# Family free
 
Application where family members can create their own family tree and in general their family memories

## Getting Started

### Dependencies
- Run yarn on root folder to install Express
- Cd client, yarn install and yarn start to install React

### Database (sorry for all the troubles)
- Created MySQL database called family tree. There is a space between the words so please run  family tree with backticks to access to the database
- Created .env file in the root folder to keep information about mySQL autentication, DB_HOST, DB_USER, DB_NAME, DB_PASS. In file database.js update information according to info in your .env file
- Installed extension for MySQL in your code editor to avoid migrate the database:
Name: MySQL 
Description: MySQL management tool
Version: 0.4.0
Publisher: Jun Han
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=formulahendry.vscode-mysql 
- You can access your MySQL from you code editor 

### Flow diagram

![User Flow Diagram](Images\NewUserFlow.PNG) 

### Database schema
- Started with building one database with multiple tables. 

- Create table on MySQL or DataGrip (copy and paste one table at the time):

Table 1 
create table person
(
    id             int auto_increment
        primary key,
    name           text null,
    sex            text null,
    age            int  null,
    location_id    int  null,
    parents_id     int  null,
    image_location text null,
    date_of_birth  date null,
    constraint person_location_id_fk
        foreign key (location_id) references location (id),
    constraint person_parents_id_fk
        foreign key (parents_id) references parents (id)
);

Table 2 
create table items
(
    id            int auto_increment
        primary key,
    name          text null,
    type          text null,
    description   text null,
    item_location text null,
    person_id     int  null,
    constraint items_person_id_fk
        foreign key (person_id) references person (id)
);

Table 3
create table location
(
    id      int auto_increment
        primary key,
    city    text null,
    country text null
);

Table 4
create table parents
(
    id      int auto_increment
        primary key,
    name    text null,
    parent1 text null,
    parent2 text null
);


- Later on, created a simple table (user) not connected with the other ones to try the fetch method

Table 5
create table user
(
    name         text null,
    surname      text null,
    relationship text null,
    description  text null,
    id           int auto_increment
        primary key
);

![Database schema](Images\Captureee.PNG)

### API routes plan
Api routes plan for the simple table(user)
![API routes plan](Images\API.PNG)


### Future features
- Log in form
- Sections for items(pictures, music, history, etc.)
- Option for connecting and sharing information with other members

### Technologies
MySQl
Express
Node.js
React
Bootstrap

### Credit
_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona.