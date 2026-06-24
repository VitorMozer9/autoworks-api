package com.github.vitormozer9.autoworks_api.modules.services.repositories;

import com.github.vitormozer9.autoworks_api.modules.services.entities.WorkshopService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WorkshopServiceRepository extends JpaRepository<WorkshopService, Long> {

    boolean existsByCodigoIgnoreCase(String codigo);

    boolean existsByCodigoIgnoreCaseAndIdNot(String codigo, Long id);

    @Query("""
            SELECT service FROM WorkshopService service
            WHERE (:nome IS NULL OR LOWER(service.nome) LIKE LOWER(CONCAT('%', :nome, '%')))
              AND (:ativo IS NULL OR service.ativo = :ativo)
            ORDER BY service.nome
            """)
    List<WorkshopService> search(@Param("nome") String nome, @Param("ativo") Boolean ativo);
}
