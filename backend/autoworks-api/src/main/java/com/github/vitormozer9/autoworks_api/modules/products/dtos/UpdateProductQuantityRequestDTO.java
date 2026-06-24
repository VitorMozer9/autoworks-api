package com.github.vitormozer9.autoworks_api.modules.products.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UpdateProductQuantityRequestDTO(
        @NotNull(message = "Quantidade é obrigatória")
        @Min(value = 0, message = "Quantidade deve ser maior ou igual a zero")
        Integer quantidade
) {
}
