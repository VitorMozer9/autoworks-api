package com.github.vitormozer9.autoworks_api.modules.appointments.useCases;

import com.github.vitormozer9.autoworks_api.exceptions.ResourceNotFoundException;
import com.github.vitormozer9.autoworks_api.modules.appointments.repositories.AppointmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DeleteAgendamentoUseCase {

    private final AppointmentRepository appointmentRepository;

    public DeleteAgendamentoUseCase(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @Transactional
    public void execute(Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Agendamento não encontrado");
        }
        appointmentRepository.deleteById(id);
    }
}
