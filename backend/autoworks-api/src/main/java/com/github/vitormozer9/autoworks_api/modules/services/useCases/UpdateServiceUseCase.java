package com.github.vitormozer9.autoworks_api.modules.services.useCases;

import com.github.vitormozer9.autoworks_api.exceptions.BusinessException;
import com.github.vitormozer9.autoworks_api.exceptions.ResourceNotFoundException;
import com.github.vitormozer9.autoworks_api.modules.services.dtos.ServiceResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.services.dtos.UpdateServiceRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.services.entities.WorkshopService;
import com.github.vitormozer9.autoworks_api.modules.services.mappers.WorkshopServiceMapper;
import com.github.vitormozer9.autoworks_api.modules.services.repositories.WorkshopServiceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UpdateServiceUseCase {

    private final WorkshopServiceRepository workshopServiceRepository;
    private final WorkshopServiceMapper workshopServiceMapper;

    public UpdateServiceUseCase(WorkshopServiceRepository workshopServiceRepository, WorkshopServiceMapper workshopServiceMapper) {
        this.workshopServiceRepository = workshopServiceRepository;
        this.workshopServiceMapper = workshopServiceMapper;
    }

    @Transactional
    public ServiceResponseDTO execute(Long id, UpdateServiceRequestDTO request) {
        WorkshopService service = workshopServiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Serviço não encontrado"));

        if (workshopServiceRepository.existsByCodigoIgnoreCaseAndIdNot(request.codigo(), id)) {
            throw new BusinessException("Código do serviço já cadastrado");
        }

        service.update(request.codigo(), request.nome(), request.descricao(), request.valorBase(), request.ativo());
        return workshopServiceMapper.toResponse(service);
    }
}
