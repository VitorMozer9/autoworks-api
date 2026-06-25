package com.github.vitormozer9.autoworks_api.modules.services.useCases;

import com.github.vitormozer9.autoworks_api.modules.services.dtos.ServiceResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.services.entities.WorkshopService;
import com.github.vitormozer9.autoworks_api.modules.services.mappers.WorkshopServiceMapper;
import com.github.vitormozer9.autoworks_api.modules.services.repositories.WorkshopServiceRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

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
        String nomeFiltrado = blankToNull(nome);

        return workshopServiceRepository.findAll(
                        buildSpecification(nomeFiltrado, ativo),
                        Sort.by(Sort.Direction.ASC, "nome")
                )
                .stream()
                .map(workshopServiceMapper::toResponse)
                .toList();
    }

    private Specification<WorkshopService> buildSpecification(String nome, Boolean ativo) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (nome != null) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("nome")),
                        contains(nome)
                ));
            }

            if (ativo != null) {
                predicates.add(criteriaBuilder.equal(root.get("ativo"), ativo));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }

    private String contains(String value) {
        return "%" + value.toLowerCase(Locale.ROOT) + "%";
    }
}
