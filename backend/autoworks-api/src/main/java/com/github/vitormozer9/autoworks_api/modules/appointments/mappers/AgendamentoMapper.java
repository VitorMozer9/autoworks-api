package com.github.vitormozer9.autoworks_api.modules.appointments.mappers;

import com.github.vitormozer9.autoworks_api.modules.appointments.dtos.AgendamentoResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.appointments.dtos.CreateAgendamentoRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.appointments.entities.Appointment;
import org.springframework.stereotype.Component;

@Component
public class AgendamentoMapper {

    public Appointment toEntity(CreateAgendamentoRequestDTO request) {
        return new Appointment(
                request.servico(),
                request.nomeCliente(),
                request.telefone(),
                request.email(),
                request.cpf(),
                request.endereco(),
                request.placa(),
                request.modelo(),
                request.nomeMecanico(),
                request.valor()
        );
    }

    public AgendamentoResponseDTO toResponse(Appointment appointment) {
        return new AgendamentoResponseDTO(
                appointment.getId(),
                appointment.getServico(),
                appointment.getNomeCliente(),
                appointment.getTelefone(),
                appointment.getEmail(),
                appointment.getCpf(),
                appointment.getEndereco(),
                appointment.getPlaca(),
                appointment.getModelo(),
                appointment.getNomeMecanico(),
                appointment.getValor(),
                appointment.getStatus().getLabel()
        );
    }
}
