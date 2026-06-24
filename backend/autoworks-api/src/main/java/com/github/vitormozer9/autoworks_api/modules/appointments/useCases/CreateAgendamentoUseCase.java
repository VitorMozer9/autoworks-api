package com.github.vitormozer9.autoworks_api.modules.appointments.useCases;

import com.github.vitormozer9.autoworks_api.modules.appointments.dtos.AgendamentoResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.appointments.dtos.CreateAgendamentoRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.appointments.entities.Appointment;
import com.github.vitormozer9.autoworks_api.modules.appointments.mappers.AgendamentoMapper;
import com.github.vitormozer9.autoworks_api.modules.appointments.repositories.AppointmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CreateAgendamentoUseCase {

    private final AppointmentRepository appointmentRepository;
    private final AgendamentoMapper agendamentoMapper;

    public CreateAgendamentoUseCase(AppointmentRepository appointmentRepository, AgendamentoMapper agendamentoMapper) {
        this.appointmentRepository = appointmentRepository;
        this.agendamentoMapper = agendamentoMapper;
    }

    @Transactional
    public AgendamentoResponseDTO execute(CreateAgendamentoRequestDTO request) {
        Appointment appointment = appointmentRepository.save(agendamentoMapper.toEntity(request));
        return agendamentoMapper.toResponse(appointment);
    }
}
