package com.github.vitormozer9.autoworks_api.modules.services.repositories;

import com.github.vitormozer9.autoworks_api.modules.services.entities.WorkshopService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface WorkshopServiceRepository extends JpaRepository<WorkshopService, Long>, JpaSpecificationExecutor<WorkshopService> {

    boolean existsByCodigoIgnoreCase(String codigo);

    boolean existsByCodigoIgnoreCaseAndIdNot(String codigo, Long id);
}
