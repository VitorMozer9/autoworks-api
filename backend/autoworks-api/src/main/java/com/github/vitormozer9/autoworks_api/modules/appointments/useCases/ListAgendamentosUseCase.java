package com.github.vitormozer9.autoworks_api.modules.appointments.useCases;

import com.github.vitormozer9.autoworks_api.modules.appointments.dtos.AgendamentoResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.appointments.mappers.AgendamentoMapper;
import com.github.vitormozer9.autoworks_api.modules.appointments.repositories.AppointmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ListAgendamentosUseCase {

    private final AppointmentRepository appointmentRepository;
    private final AgendamentoMapper agendamentoMapper;

    public ListAgendamentosUseCase(AppointmentRepository appointmentRepository, AgendamentoMapper agendamentoMapper) {
        this.appointmentRepository = appointmentRepository;
        this.agendamentoMapper = agendamentoMapper;
    }

    @Transactional(readOnly = true)
    public List<AgendamentoResponseDTO> execute() {
        return appointmentRepository.findAll()
                .stream()
                .map(agendamentoMapper::toResponse)
                .toList();
    }
}
