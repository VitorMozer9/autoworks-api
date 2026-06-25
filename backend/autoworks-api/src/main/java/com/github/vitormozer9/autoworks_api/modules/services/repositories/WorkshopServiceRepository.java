package com.github.vitormozer9.autoworks_api.modules.services.repositories;

import com.github.vitormozer9.autoworks_api.modules.services.entities.WorkshopService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkshopServiceRepository extends JpaRepository<WorkshopService, Long> {

    boolean existsByCodigoIgnoreCase(String codigo);

    boolean existsByCodigoIgnoreCaseAndIdNot(String codigo, Long id);

    List<WorkshopService> findAllByOrderByNomeAsc();

    List<WorkshopService> findByAtivoOrderByNomeAsc(Boolean ativo);

    List<WorkshopService> findByNomeContainingIgnoreCaseOrderByNomeAsc(String nome);

    List<WorkshopService> findByNomeContainingIgnoreCaseAndAtivoOrderByNomeAsc(String nome, Boolean ativo);
}
