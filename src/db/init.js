const Database = require('config')

/* iniciando a conexão com o banco de dados */
Database()

/* primary key - numero identificador da informação que nao se repete 
toda tabela precisa ter id 
int e integer - numero inteiro */
Database.exec(`CREATE TABLE profile(
    id INTERGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_day INT,
    vacation_per_year INT,
    value_hour INT
)`);

Database.exec(`CREATE TABLE jobs(
    id INTERGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT,
    daily_hours INT,
    total_hours INT,
    created_at DATETIME
)`);

/* inserindo um dado nas tabelas */
Database.run(`INSERT INTO profile(
    name,
    avatar,
    monthly_budget,
    days_per_week,
    hours_per_day,
    vacation_per_year,
) VALUES (
    "Alana",
    "https://github.com/alanaragusa.png",
    3000,
    5,
    5,
    4,
);`)

Database.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at,
) VALUES (
    "Pizzaria Guloso",
    2 ,
    1 ,
    1617514376018,
);`)

Database.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at,
) VALUES (
    "OneTwo Project",
    3 ,
    47 ,
    1617514376018,
);`)

/* finalizando conexao com o banco de dados */
Database.close()