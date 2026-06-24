package com.github.vitormozer9.autoworks_api.modules.services.useCases;

import com.github.vitormozer9.autoworks_api.exceptions.ResourceNotFoundException;
import com.github.vitormozer9.autoworks_api.modules.services.repositories.WorkshopServiceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DeleteServiceUseCase {

    private final WorkshopServiceRepository workshopServiceRepository;

    public DeleteServiceUseCase(WorkshopServiceRepository workshopServiceRepository) {
        this.workshopServiceRepository = workshopServiceRepository;
    }

    @Transactional
    public void execute(Long id) {
        if (!workshopServiceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Serviço não encontrado");
        }
        workshopServiceRepository.deleteById(id);
    }
}
