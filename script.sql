SELECT * FROM Usuario;
SELECT * FROM Clientes;
SELECT * FROM Agendamentos;
SELECT * FROM Servicos;

DELETE FROM Clientes;

CREATE TABLE Usuario (
id_usuario SERIAL PRIMARY KEY,
nome_usuario VARCHAR(250) UNIQUE ,
senha_usuario VARCHAR(250)
);
CREATE TABLE Clientes (
id_cliente SERIAL PRIMARY KEY,
CPF VARCHAR(300) UNIQUE,
nome_cliente VARCHAR(250)
);
CREATE TABLE Agendamentos (
id_agendamento SERIAL PRIMARY KEY,
data_agendamento TIMESTAMP,
id_cliente INT REFERENCES Clientes(id_cliente),
id_servico INT REFERENCES Servicos(id_servico)
);

CREATE TABLE Servicos (
id_servico SERIAL PRIMARY KEY,
nome_servico VARCHAR(250),
tipo_servico VARCHAR(250),
valor_servico DECIMAL(10,2)
);

INSERT INTO Usuario (nome_usuario, senha_usuario) 
VALUES
('Rodrigo', 12345678),
('Bruno', 12345678),
('Leda', 12345678);

INSERT INTO Clientes (CPF, nome_cliente) 
VALUES
(md5('12345678911') , 'Carlos'),
(md5('12345678910'), 'Arthur'),
(md5('12345678912'), 'Tarciso');

INSERT INTO Agendamentos (data_agendamento, id_cliente, id_servico) 
VALUES
('2026-11-10 10:23:54', 4, 1),
('2026-11-10 11:00:00', 5, 1),
('2026-11-10 11:30:00', 6, 1)
;

INSERT INTO Servicos (nome_servico, tipo_servico, valor_servico) 
VALUES
('Corte cabelo', 'Cabelo', 30),
('Barba completa', 'Barba', 25),
('Pigamentação cabelo', 'Pigmentação', 40);