CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(160) NOT NULL,
    codigo VARCHAR(60) NOT NULL UNIQUE,
    quantidade INTEGER NOT NULL,
    marca VARCHAR(120),
    data_aquisicao DATE,
    valor NUMERIC(12, 2) NOT NULL,
    categoria VARCHAR(30) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);