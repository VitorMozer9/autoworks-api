CREATE TABLE appointments (
    id BIGSERIAL PRIMARY KEY,
    servico VARCHAR(120) NOT NULL,
    nome_cliente VARCHAR(180) NOT NULL,
    telefone VARCHAR(40),
    email VARCHAR(180),
    cpf VARCHAR(30),
    endereco VARCHAR(255),
    placa VARCHAR(20),
    modelo VARCHAR(120),
    nome_mecanico VARCHAR(180),
    valor NUMERIC(12, 2) NOT NULL,
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);