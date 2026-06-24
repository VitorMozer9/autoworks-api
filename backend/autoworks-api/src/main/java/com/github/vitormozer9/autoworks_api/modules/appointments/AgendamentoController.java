package com.github.vitormozer9.autoworks_api.modules.appointments;

import com.github.vitormozer9.autoworks_api.modules.appointments.dtos.AgendamentoResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.appointments.dtos.CreateAgendamentoRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.appointments.dtos.UpdateAgendamentoRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.appointments.useCases.CreateAgendamentoUseCase;
import com.github.vitormozer9.autoworks_api.modules.appointments.useCases.DeleteAgendamentoUseCase;
import com.github.vitormozer9.autoworks_api.modules.appointments.useCases.ListAgendamentosUseCase;
import com.github.vitormozer9.autoworks_api.modules.appointments.useCases.UpdateAgendamentoUseCase;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    private final ListAgendamentosUseCase listAgendamentosUseCase;
    private final CreateAgendamentoUseCase createAgendamentoUseCase;
    private final UpdateAgendamentoUseCase updateAgendamentoUseCase;
    private final DeleteAgendamentoUseCase deleteAgendamentoUseCase;

    public AgendamentoController(
            ListAgendamentosUseCase listAgendamentosUseCase,
            CreateAgendamentoUseCase createAgendamentoUseCase,
            UpdateAgendamentoUseCase updateAgendamentoUseCase,
            DeleteAgendamentoUseCase deleteAgendamentoUseCase
    ) {
        this.listAgendamentosUseCase = listAgendamentosUseCase;
        this.createAgendamentoUseCase = createAgendamentoUseCase;
        this.updateAgendamentoUseCase = updateAgendamentoUseCase;
        this.deleteAgendamentoUseCase = deleteAgendamentoUseCase;
    }

    @GetMapping
    public ResponseEntity<List<AgendamentoResponseDTO>> list() {
        return ResponseEntity.ok(listAgendamentosUseCase.execute());
    }

    @PostMapping
    public ResponseEntity<AgendamentoResponseDTO> create(@Valid @RequestBody CreateAgendamentoRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(createAgendamentoUseCase.execute(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AgendamentoResponseDTO> update(@PathVariable Long id, @Valid @RequestBody UpdateAgendamentoRequestDTO request) {
        return ResponseEntity.ok(updateAgendamentoUseCase.execute(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        deleteAgendamentoUseCase.execute(id);
        return ResponseEntity.noContent().build();
    }
}
