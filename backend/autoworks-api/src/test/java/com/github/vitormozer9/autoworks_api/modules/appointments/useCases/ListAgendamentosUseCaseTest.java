package com.github.vitormozer9.autoworks_api.modules.appointments.useCases;

import com.github.vitormozer9.autoworks_api.modules.appointments.dtos.AgendamentoResponseDTO;
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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ListAgendamentosUseCaseTest {

    @Mock
    private AppointmentRepository appointmentRepository;

    @Spy
    private AgendamentoMapper agendamentoMapper;

    @InjectMocks
    private ListAgendamentosUseCase listAgendamentosUseCase;

    @Test
    void shouldListAgendamentosMappedToResponseDtos() {
        Appointment appointment = new Appointment("troca-oleo", "Cliente", "31999999999", "cliente@email.com", "123",
                "Rua A", "ABC1234", "Civic", "Mecânico", new BigDecimal("120.00"));
        when(appointmentRepository.findAll()).thenReturn(List.of(appointment));

        List<AgendamentoResponseDTO> response = listAgendamentosUseCase.execute();

        assertThat(response).hasSize(1);
        assertThat(response.get(0).servico()).isEqualTo("troca-oleo");
        assertThat(response.get(0).status()).isEqualTo("Pendente");
    }
}
