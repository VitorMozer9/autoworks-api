package com.github.vitormozer9.autoworks_api.modules.products.dtos;

package com.github.vitormozer9.autoworks_api.modules.products.dtos;

import com.github.vitormozer9.autoworks_api.modules.products.entities.ProductCategory;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ProductResponseDTO(
        Long id,
        String nome,
        String codigo,
        Integer quantidade,
        String marca,
        LocalDate dataAquisicao,
        BigDecimal valor,
        ProductCategory categoria
) {
}
