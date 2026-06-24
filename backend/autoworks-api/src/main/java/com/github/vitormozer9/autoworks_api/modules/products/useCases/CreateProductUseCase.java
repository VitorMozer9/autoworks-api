package com.github.vitormozer9.autoworks_api.modules.products.useCases;

import com.github.vitormozer9.autoworks_api.exceptions.BusinessException;
import com.github.vitormozer9.autoworks_api.modules.products.dtos.CreateProductRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.products.dtos.ProductResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.products.entities.Product;
import com.github.vitormozer9.autoworks_api.modules.products.mappers.ProductMapper;
import com.github.vitormozer9.autoworks_api.modules.products.repositories.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CreateProductUseCase {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public CreateProductUseCase(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @Transactional
    public ProductResponseDTO execute(CreateProductRequestDTO request) {
        if (productRepository.existsByCodigoIgnoreCase(request.codigo())) {
            throw new BusinessException("Código do produto já cadastrado");
        }

        Product product = productRepository.save(productMapper.toEntity(request));
        return productMapper.toResponse(product);
    }
}
