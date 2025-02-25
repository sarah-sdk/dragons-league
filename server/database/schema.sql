CREATE TABLE user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  password varchar(255) not null,
  isAdmin BOOLEAN not null default false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null
);

CREATE TABLE profile (
  id int unsigned primary key auto_increment not null,
  username varchar(255) not null,
  url_avatar varchar(255) not null,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
  user_id int unsigned not null,
  foreign key(user_id) references user(id)
);

CREATE TABLE specie (
  id int unsigned primary key auto_increment not null,
  specie varchar(255) not null unique,
  base_strength INT unsigned not null,
  base_speed INT unsigned not null,
  base_stamina INT unsigned not null,
  url_baby varchar(255) not null,
  url_adult varchar(255) not null
);

CREATE TABLE dragon (
  id INT unsigned primary key auto_increment not null,
  name varchar(255) not null,
  adopted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
  strength INT unsigned not null,
  speed INT unsigned not null,
  stamina INT unsigned not null,
  specie_id INT unsigned not null,
  profile_id INT unsigned not null,
  foreign key(specie_id) references specie(id),
  foreign key(profile_id) references profile(id)
);

CREATE TABLE training (
  id INT unsigned primary key auto_increment not null,
  training_type VARCHAR(255) not null
);

CREATE TABLE dragon_training (
  id INT unsigned primary key auto_increment not null,
  strength_earned INT unsigned not null,
  speed_earned INT unsigned not null,
  stamina_earned INT unsigned not null,
  doing_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
  dragon_id INT unsigned not null,
  training_id INT unsigned not null,
  foreign key(dragon_id) references dragon(id),
  foreign key(training_id) references training(id)
);
