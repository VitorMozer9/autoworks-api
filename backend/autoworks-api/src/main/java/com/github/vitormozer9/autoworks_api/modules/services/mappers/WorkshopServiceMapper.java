package com.github.vitormozer9.autoworks_api.modules.services.mappers;

import com.github.vitormozer9.autoworks_api.modules.services.dtos.CreateServiceRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.services.dtos.ServiceResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.services.entities.WorkshopService;
import org.springframework.stereotype.Component;

@Component
public class WorkshopServiceMapper {

    public WorkshopService toEntity(CreateServiceRequestDTO request) {
        return new WorkshopService(request.codigo(), request.nome(), request.descricao(), request.valorBase(), request.ativo());
    }

    public ServiceResponseDTO toResponse(WorkshopService service) {
        return new ServiceResponseDTO(
                service.getId(),
                service.getCodigo(),
                service.getNome(),
                service.getDescricao(),
                service.getValorBase(),
                service.getAtivo()
        );
    }
}
