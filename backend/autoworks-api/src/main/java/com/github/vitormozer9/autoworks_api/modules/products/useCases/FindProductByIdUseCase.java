package com.github.vitormozer9.autoworks_api.modules.products.useCases;

import com.github.vitormozer9.autoworks_api.exceptions.ResourceNotFoundException;
import com.github.vitormozer9.autoworks_api.modules.products.dtos.ProductResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.products.mappers.ProductMapper;
import com.github.vitormozer9.autoworks_api.modules.products.repositories.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FindProductByIdUseCase {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public FindProductByIdUseCase(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @Transactional(readOnly = true)
    public ProductResponseDTO execute(Long id) {
        return productRepository.findById(id)
                .map(productMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado"));
    }
}
