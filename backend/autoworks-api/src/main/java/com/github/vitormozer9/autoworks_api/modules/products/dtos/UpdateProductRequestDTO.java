package com.github.vitormozer9.autoworks_api.modules.products.dtos;

import com.github.vitormozer9.autoworks_api.modules.products.entities.ProductCategory;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public record UpdateProductRequestDTO(
        @NotBlank(message = "Nome é obrigatório")
        String nome,

        @NotBlank(message = "Código é obrigatório")
        String codigo,

        @NotNull(message = "Quantidade é obrigatória")
        @Min(value = 0, message = "Quantidade deve ser maior ou igual a zero")
        Integer quantidade,

        String marca,
        LocalDate dataAquisicao,

        @NotNull(message = "Valor é obrigatório")
        @DecimalMin(value = "0.00", message = "Valor deve ser maior ou igual a zero")
        BigDecimal valor,

        @NotNull(message = "Categoria é obrigatória")
        ProductCategory categoria
) {
}
