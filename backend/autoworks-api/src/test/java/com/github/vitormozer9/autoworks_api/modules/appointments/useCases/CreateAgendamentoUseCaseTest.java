package com.github.vitormozer9.autoworks_api.modules.appointments.useCases;

import com.github.vitormozer9.autoworks_api.modules.appointments.dtos.AgendamentoResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.appointments.dtos.CreateAgendamentoRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.appointments.entities.Appointment;
import com.github.vitormozer9.autoworks_api.modules.appointments.mappers.AgendamentoMapper;
import com.github.vitormozer9.autoworks_api.modules.appointments.repositories.AppointmentRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CreateAgendamentoUseCaseTest {

    @Mock
    private AppointmentRepository appointmentRepository;

    @Spy
    private AgendamentoMapper agendamentoMapper;

    @InjectMocks
    private CreateAgendamentoUseCase createAgendamentoUseCase;

    @Test
    void shouldCreateAgendamentoWithInitialPendingStatus() {
        CreateAgendamentoRequestDTO request = new CreateAgendamentoRequestDTO(
                "revisao", "Maria Silva", "31999999999", "maria@email.com", "12345678900",
                "Rua A", "ABC1234", "Gol", "João Mecânico", new BigDecimal("250.00")
        );
        when(appointmentRepository.save(any(Appointment.class))).thenAnswer(invocation -> invocation.getArgument(0));

        AgendamentoResponseDTO response = createAgendamentoUseCase.execute(request);

        ArgumentCaptor<Appointment> captor = ArgumentCaptor.forClass(Appointment.class);
        verify(appointmentRepository).save(captor.capture());
        assertThat(captor.getValue().getStatus().getLabel()).isEqualTo("Pendente");
        assertThat(response.servico()).isEqualTo("revisao");
        assertThat(response.status()).isEqualTo("Pendente");
        assertThat(response.valor()).isEqualByComparingTo("250.00");
    }
}
