create database if not exists lead_manager;

use lead_manager;

create table users(
	id char(36) primary key,
    email varchar(100),
    password varchar(255),
    created_at timestamp default current_timestamp
);

create table leads(
	id char(36) primary key,
    user_id char(36),
    username varchar(100),
    email varchar(100),
    phone varchar(20),
    company varchar(100),
    source varchar(100),
    status enum("New","Contacted","Qualified","Lost"),
    foreign key(user_id) references users(id)
);



