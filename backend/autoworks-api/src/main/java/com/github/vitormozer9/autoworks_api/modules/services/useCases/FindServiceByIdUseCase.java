package com.github.vitormozer9.autoworks_api.modules.services.useCases;

import com.github.vitormozer9.autoworks_api.exceptions.ResourceNotFoundException;
import com.github.vitormozer9.autoworks_api.modules.services.dtos.ServiceResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.services.mappers.WorkshopServiceMapper;
import com.github.vitormozer9.autoworks_api.modules.services.repositories.WorkshopServiceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FindServiceByIdUseCase {

    private final WorkshopServiceRepository workshopServiceRepository;
    private final WorkshopServiceMapper workshopServiceMapper;

    public FindServiceByIdUseCase(WorkshopServiceRepository workshopServiceRepository, WorkshopServiceMapper workshopServiceMapper) {
        this.workshopServiceRepository = workshopServiceRepository;
        this.workshopServiceMapper = workshopServiceMapper;
    }

    @Transactional(readOnly = true)
    public ServiceResponseDTO execute(Long id) {
        return workshopServiceRepository.findById(id)
                .map(workshopServiceMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Serviço não encontrado"));
    }
}
