package com.github.vitormozer9.autoworks_api.modules.appointments.useCases;

import com.github.vitormozer9.autoworks_api.exceptions.ResourceNotFoundException;
import com.github.vitormozer9.autoworks_api.modules.appointments.dtos.AgendamentoResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.appointments.dtos.UpdateAgendamentoRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.appointments.entities.Appointment;
import com.github.vitormozer9.autoworks_api.modules.appointments.mappers.AgendamentoMapper;
import com.github.vitormozer9.autoworks_api.modules.appointments.repositories.AppointmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UpdateAgendamentoUseCase {

    private final AppointmentRepository appointmentRepository;
    private final AgendamentoMapper agendamentoMapper;

    public UpdateAgendamentoUseCase(AppointmentRepository appointmentRepository, AgendamentoMapper agendamentoMapper) {
        this.appointmentRepository = appointmentRepository;
        this.agendamentoMapper = agendamentoMapper;
    }

    @Transactional
    public AgendamentoResponseDTO execute(Long id, UpdateAgendamentoRequestDTO request) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Agendamento não encontrado"));

        appointment.update(
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

        return agendamentoMapper.toResponse(appointment);
    }
}
