package com.github.vitormozer9.autoworks_api.modules.services.dtos;

import java.math.BigDecimal;

public record ServiceResponseDTO(
        Long id,
        String codigo,
        String nome,
        String descricao,
        BigDecimal valorBase,
        Boolean ativo
) {
}