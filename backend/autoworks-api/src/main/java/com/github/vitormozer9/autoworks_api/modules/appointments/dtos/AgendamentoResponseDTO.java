package com.github.vitormozer9.autoworks_api.modules.appointments.dtos;

import java.math.BigDecimal;

public record AgendamentoResponseDTO(
        Long id,
        String servico,
        String nomeCliente,
        String telefone,
        String email,
        String cpf,
        String endereco,
        String placa,
        String modelo,
        String nomeMecanico,
        BigDecimal valor,
        String status
) {
}