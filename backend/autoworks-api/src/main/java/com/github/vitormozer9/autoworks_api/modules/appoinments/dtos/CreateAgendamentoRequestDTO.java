package com.github.vitormozer9.autoworks_api.modules.appoinments.dtos;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record CreateAgendamentoRequestDTO(
        @NotBlank(message = "Serviço é obrigatório")
        String servico,

        @NotBlank(message = "Nome do cliente é obrigatório")
        String nomeCliente,

        String telefone,

        @Email(message = "E-mail inválido")
        String email,

        String cpf,
        String endereco,
        String placa,
        String modelo,
        String nomeMecanico,

        @NotNull(message = "Valor é obrigatório")
        @DecimalMin(value = "0.00", message = "Valor deve ser maior ou igual a zero")
        BigDecimal valor
) {
}
