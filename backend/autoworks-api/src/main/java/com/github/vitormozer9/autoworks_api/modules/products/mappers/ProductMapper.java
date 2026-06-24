package com.github.vitormozer9.autoworks_api.modules.products.mappers;

import com.github.vitormozer9.autoworks_api.modules.products.dtos.CreateProductRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.products.dtos.ProductResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.products.entities.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public Product toEntity(CreateProductRequestDTO request) {
        return new Product(
                request.nome(),
                request.codigo(),
                request.quantidade(),
                request.marca(),
                request.dataAquisicao(),
                request.valor(),
                request.categoria()
        );
    }

    public ProductResponseDTO toResponse(Product product) {
        return new ProductResponseDTO(
                product.getId(),
                product.getNome(),
                product.getCodigo(),
                product.getQuantidade(),
                product.getMarca(),
                product.getDataAquisicao(),
                product.getValor(),
                product.getCategoria()
        );
    }
}