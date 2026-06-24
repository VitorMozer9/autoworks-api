package com.github.vitormozer9.autoworks_api.modules.services.controllers;

import com.github.vitormozer9.autoworks_api.modules.services.dtos.CreateServiceRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.services.dtos.ServiceResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.services.dtos.UpdateServiceRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.services.useCases.CreateServiceUseCase;
import com.github.vitormozer9.autoworks_api.modules.services.useCases.DeleteServiceUseCase;
import com.github.vitormozer9.autoworks_api.modules.services.useCases.FindServiceByIdUseCase;
import com.github.vitormozer9.autoworks_api.modules.services.useCases.ListServicesUseCase;
import com.github.vitormozer9.autoworks_api.modules.services.useCases.UpdateServiceUseCase;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/servicos")
public class ServicoController {

    private final CreateServiceUseCase createServiceUseCase;
    private final ListServicesUseCase listServicesUseCase;
    private final FindServiceByIdUseCase findServiceByIdUseCase;
    private final UpdateServiceUseCase updateServiceUseCase;
    private final DeleteServiceUseCase deleteServiceUseCase;

    public ServicoController(
            CreateServiceUseCase createServiceUseCase,
            ListServicesUseCase listServicesUseCase,
            FindServiceByIdUseCase findServiceByIdUseCase,
            UpdateServiceUseCase updateServiceUseCase,
            DeleteServiceUseCase deleteServiceUseCase
    ) {
        this.createServiceUseCase = createServiceUseCase;
        this.listServicesUseCase = listServicesUseCase;
        this.findServiceByIdUseCase = findServiceByIdUseCase;
        this.updateServiceUseCase = updateServiceUseCase;
        this.deleteServiceUseCase = deleteServiceUseCase;
    }

    @GetMapping
    public ResponseEntity<List<ServiceResponseDTO>> list(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) Boolean ativo
    ) {
        return ResponseEntity.ok(listServicesUseCase.execute(nome, ativo));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(findServiceByIdUseCase.execute(id));
    }

    @PostMapping
    public ResponseEntity<ServiceResponseDTO> create(@Valid @RequestBody CreateServiceRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(createServiceUseCase.execute(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceResponseDTO> update(@PathVariable Long id, @Valid @RequestBody UpdateServiceRequestDTO request) {
        return ResponseEntity.ok(updateServiceUseCase.execute(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        deleteServiceUseCase.execute(id);
        return ResponseEntity.noContent().build();
    }
}
