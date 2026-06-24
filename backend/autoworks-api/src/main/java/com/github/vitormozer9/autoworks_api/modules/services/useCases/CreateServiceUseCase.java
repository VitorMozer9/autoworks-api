package com.github.vitormozer9.autoworks_api.modules.services.useCases;

import com.github.vitormozer9.autoworks_api.exceptions.BusinessException;
import com.github.vitormozer9.autoworks_api.modules.services.dtos.CreateServiceRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.services.dtos.ServiceResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.services.entities.WorkshopService;
import com.github.vitormozer9.autoworks_api.modules.services.mappers.WorkshopServiceMapper;
import com.github.vitormozer9.autoworks_api.modules.services.repositories.WorkshopServiceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CreateServiceUseCase {

    private final WorkshopServiceRepository workshopServiceRepository;
    private final WorkshopServiceMapper workshopServiceMapper;

    public CreateServiceUseCase(WorkshopServiceRepository workshopServiceRepository, WorkshopServiceMapper workshopServiceMapper) {
        this.workshopServiceRepository = workshopServiceRepository;
        this.workshopServiceMapper = workshopServiceMapper;
    }

    @Transactional
    public ServiceResponseDTO execute(CreateServiceRequestDTO request) {
        if (workshopServiceRepository.existsByCodigoIgnoreCase(request.codigo())) {
            throw new BusinessException("Código do serviço já cadastrado");
        }

        WorkshopService service = workshopServiceRepository.save(workshopServiceMapper.toEntity(request));
        return workshopServiceMapper.toResponse(service);
    }
}
