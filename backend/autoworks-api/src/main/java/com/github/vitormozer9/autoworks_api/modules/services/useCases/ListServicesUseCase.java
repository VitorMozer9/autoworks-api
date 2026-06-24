package com.github.vitormozer9.autoworks_api.modules.services.useCases;

import com.github.vitormozer9.autoworks_api.modules.services.dtos.ServiceResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.services.mappers.WorkshopServiceMapper;
import com.github.vitormozer9.autoworks_api.modules.services.repositories.WorkshopServiceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ListServicesUseCase {

    private final WorkshopServiceRepository workshopServiceRepository;
    private final WorkshopServiceMapper workshopServiceMapper;

    public ListServicesUseCase(WorkshopServiceRepository workshopServiceRepository, WorkshopServiceMapper workshopServiceMapper) {
        this.workshopServiceRepository = workshopServiceRepository;
        this.workshopServiceMapper = workshopServiceMapper;
    }

    @Transactional(readOnly = true)
    public List<ServiceResponseDTO> execute(String nome, Boolean ativo) {
        return workshopServiceRepository.search(blankToNull(nome), ativo)
                .stream()
                .map(workshopServiceMapper::toResponse)
                .toList();
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}