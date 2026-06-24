package com.github.vitormozer9.autoworks_api.modules.appointments.useCases;

import com.github.vitormozer9.autoworks_api.exceptions.ResourceNotFoundException;
import com.github.vitormozer9.autoworks_api.modules.appointments.dtos.AgendamentoResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.appointments.dtos.UpdateAgendamentoRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.appointments.entities.Appointment;
import com.github.vitormozer9.autoworks_api.modules.appointments.mappers.AgendamentoMapper;
import com.github.vitormozer9.autoworks_api.modules.appointments.repositories.AppointmentRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UpdateAgendamentoUseCaseTest {

    @Mock
    private AppointmentRepository appointmentRepository;

    @Spy
    private AgendamentoMapper agendamentoMapper;

    @InjectMocks
    private UpdateAgendamentoUseCase updateAgendamentoUseCase;

    @Test
    void shouldUpdateAgendamentoDataWithoutChangingStatus() {
        Appointment appointment = new Appointment("revisao", "Cliente Antigo", "1", "old@email.com", "123",
                "Rua A", "ABC1234", "Gol", "Mecânico", new BigDecimal("100.00"));
        when(appointmentRepository.findById(1L)).thenReturn(Optional.of(appointment));

        UpdateAgendamentoRequestDTO request = new UpdateAgendamentoRequestDTO("funilaria", "Cliente Novo", "2", "new@email.com", "456",
                "Rua B", "XYZ9876", "Onix", "Outro Mecânico", new BigDecimal("450.00"));

        AgendamentoResponseDTO response = updateAgendamentoUseCase.execute(1L, request);

        assertThat(response.servico()).isEqualTo("funilaria");
        assertThat(response.nomeCliente()).isEqualTo("Cliente Novo");
        assertThat(response.valor()).isEqualByComparingTo("450.00");
        assertThat(response.status()).isEqualTo("Pendente");
    }

    @Test
    void shouldThrowWhenAgendamentoDoesNotExist() {
        when(appointmentRepository.findById(99L)).thenReturn(Optional.empty());
        UpdateAgendamentoRequestDTO request = new UpdateAgendamentoRequestDTO("funilaria", "Cliente", null, null, null,
                null, null, null, null, BigDecimal.ZERO);

        assertThatThrownBy(() -> updateAgendamentoUseCase.execute(99L, request))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Agendamento não encontrado");
    }
}