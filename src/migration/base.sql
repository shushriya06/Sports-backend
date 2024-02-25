-- create tables
create table if not exists mydb.sports
(
    id int auto_increment not null primary key,
    name varchar(50) not null,
    status boolean not null default true,
    recUpdatedAt timestamp not null default current_timestamp on update current_timestamp,
    createdAt timestamp not null default current_timestamp
);

create table if not exists mydb.tours
(
    id int auto_increment not null primary key,
    name varchar(50) not null,
    sportId int not null,
    status boolean not null default true,
    startTime timestamp not null,
    endTime timestamp not null,
    recUpdatedAt timestamp not null default current_timestamp on update current_timestamp,
    createdAt timestamp not null default current_timestamp,
    foreign key (sportId) references sports(id)
);

create table if not exists mydb.matches
(
    id int auto_increment not null primary key,
    name varchar(50) not null,
    tourId int not null,
    status boolean not null default true,
    format varchar(50) not null,
    startTime timestamp not null,
    endTime timestamp not null,
    recUpdatedAt timestamp not null default current_timestamp on update current_timestamp,
    createdAt timestamp not null default current_timestamp,
    foreign key (tourId) references tours(id)
);

CREATE TABLE IF NOT EXISTS mydb.news
(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    sport_id INT,
    tour_id INT,
    match_id INT,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sport_id) REFERENCES sports(id),
    FOREIGN KEY (tour_id) REFERENCES tours(id),
    FOREIGN KEY (match_id) REFERENCES matches(id)
);

-- seed data
insert ignore into mydb.sports (id, name) values (1, 'Cricket');
insert ignore into mydb.sports (id, name) values (2, 'Football');

insert ignore into mydb.tours (id, name, sportId, startTime, endTime) values (1, 'Indian Premier League, 2023', 1, '2023-04-09 00:00:00', '2023-05-30 00:00:00');
insert ignore into mydb.tours (id, name, sportId, startTime, endTime) values (2, 'India Super League, 2023', 2, '2023-04-21 00:00:00', '2023-06-20 00:00:00');
insert ignore into mydb.tours (id, name, sportId, startTime, endTime) values (3, 'India Tour of West Indies, 2023', 1, '2023-06-10 00:00:00', '2023-06-29 00:00:00');
insert ignore into mydb.tours (id, name, sportId, startTime, endTime) values (4, 'English Premier League, 2022', 2, '2022-04-09 00:00:00', '2022-05-30 00:00:00');

insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('GT vs RCB', 1, 'T20', '2023-04-09 18:00:00', '2023-04-09 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('CSK vs MI', 1, 'T20', '2023-04-10 18:00:00', '2021-04-10 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('LSG vs KXIP', 1, 'T20', '2023-04-11 18:00:00', '2023-04-11 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('RR vs SRH', 1, 'T20', '2023-04-12 18:00:00', '2023-04-12 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('BLR vs BEN', 2, 'soccer', '2023-04-29 18:00:00', '2023-04-29 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('ATK vs MCFC', 2, 'soccer', '2023-04-21 18:00:00', '2023-04-21 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('KER vs JFC', 2, 'soccer', '2023-04-22 18:00:00', '2023-04-22 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('IND vs WI', 3, 'ODI', '2023-06-10 10:00:00', '2023-06-10 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('IND vs WI', 3, 'ODI', '2023-06-12 10:00:00', '2023-06-12 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('IND vs WI', 3, 'ODI', '2023-06-14 10:00:00', '2023-06-14 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('KER vs JFC', 4, 'soccer', '2022-04-09 18:00:00', '2022-04-09 23:00:00');

-- Seed data for news related to matches
INSERT IGNORE INTO mydb.news (title, description, match_id)
VALUES 
    ('High-scoring Thriller: GT vs RCB', 'Gujarat Titans vs Royal Challengers Bangalore match ends in a thrilling tie.', 1),
    ('CSK Clinches Victory Against MI', 'Chennai Super Kings secures a convincing win against Mumbai Indians.', 2),
    ('LSG''s Dominant Performance Against KXIP', 'Lucknow Super Giants display dominance against Kings XI Punjab.', 3),
    ('RR Snatches Victory from SRH', 'Rajasthan Royals snatches victory from Sunrisers Hyderabad in a close encounter.', 4),
    ('BLR vs BEN: Intense Soccer Showdown', 'Bengaluru FC clashes with Bengaluru United in a highly anticipated soccer match.', 5),
    ('ATK Defeats MCFC in Thrilling Encounter', 'ATK Mohun Bagan secures a hard-fought victory against Mumbai City FC.', 6),
    ('KER vs JFC Ends in Draw', 'Kerala Blasters and Jamshedpur FC play out a thrilling draw in their soccer match.', 7),
    ('India Registers Convincing Win Against WI', 'India defeats West Indies in the first ODI of the series.', 8),
    ('WI Bounces Back to Level Series Against IND', 'West Indies bounces back to level the series against India with a stunning victory.', 9),
    ('Decisive Victory for India in Final ODI', 'India clinches the series with a decisive victory against West Indies in the final ODI.', 10);

-- Seed data for news related to tours
INSERT IGNORE INTO mydb.news (title, description, tour_id)
VALUES 
    ('Exciting Updates for IPL 2023', 'Stay tuned for exciting updates and news related to the Indian Premier League 2023.', 1),
    ('India Super League Highlights', 'Check out the highlights and latest news from the India Super League 2023.', 2),
    ('West Indies Tour Excitement', 'Get ready for the thrilling matches and updates from India''s tour of West Indies 2023.', 3),
    ('Recap of English Premier League 2022', 'Recap of the exciting matches and highlights from the English Premier League 2022 season.', 4),