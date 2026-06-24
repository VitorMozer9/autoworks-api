package com.github.vitormozer9.autoworks_api.modules.products.entities;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.text.Normalizer;
import java.util.Locale;

public enum ProductCategory {
    MOTOR,
    ELETRICA,
    SUSPENSAO,
    FUNILARIA,
    OLEO,
    OUTROS;

    @JsonCreator
    public static ProductCategory from(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }

        String normalized = Normalizer.normalize(value, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .replace('-', '_')
                .replace(' ', '_')
                .toUpperCase(Locale.ROOT);

        try {
            return ProductCategory.valueOf(normalized);
        } catch (IllegalArgumentException exception) {
            throw new IllegalArgumentException("Categoria de produto inválida");
        }
    }

    @JsonValue
    public String toJson() {
        return name().toLowerCase(Locale.ROOT).replace('_', '-');
    }
}
