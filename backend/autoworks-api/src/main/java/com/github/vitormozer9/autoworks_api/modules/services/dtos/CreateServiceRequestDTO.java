package com.github.vitormozer9.autoworks_api.modules.services.dtos;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record CreateServiceRequestDTO(
        @NotBlank(message = "Código é obrigatório")
        String codigo,

        @NotBlank(message = "Nome é obrigatório")
        String nome,

        String descricao,

        @NotNull(message = "Valor base é obrigatório")
        @DecimalMin(value = "0.00", message = "Valor base deve ser maior ou igual a zero")
        BigDecimal valorBase,

        Boolean ativo
) {
}
