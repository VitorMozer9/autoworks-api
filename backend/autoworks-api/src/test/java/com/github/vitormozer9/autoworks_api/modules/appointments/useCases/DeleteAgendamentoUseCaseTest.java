package com.github.vitormozer9.autoworks_api.modules.appointments.useCases;

import com.github.vitormozer9.autoworks_api.exceptions.ResourceNotFoundException;
import com.github.vitormozer9.autoworks_api.modules.appointments.repositories.AppointmentRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DeleteAgendamentoUseCaseTest {

    @Mock
    private AppointmentRepository appointmentRepository;

    @InjectMocks
    private DeleteAgendamentoUseCase deleteAgendamentoUseCase;

    @Test
    void shouldDeleteExistingAgendamento() {
        when(appointmentRepository.existsById(1L)).thenReturn(true);

        deleteAgendamentoUseCase.execute(1L);

        verify(appointmentRepository).deleteById(1L);
    }

    @Test
    void shouldThrowWhenAgendamentoDoesNotExist() {
        when(appointmentRepository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> deleteAgendamentoUseCase.execute(99L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Agendamento não encontrado");

        verify(appointmentRepository, never()).deleteById(99L);
    }
}
