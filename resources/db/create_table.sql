create table stl_city_players (
    shirt_number                  integer NOT NULL,
    first_name                    varchar NOT NULL,
    last_name                     varchar NOT NULL,
    country                       varchar NOT NULL,
    field_position                varchar NOT NULL,
    goals                         integer NOT NULL,
    assists                       integer NOT NULL,
    constraint stl_city_players_pk primary key(shirt_number)
);

commit