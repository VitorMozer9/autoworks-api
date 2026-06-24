package com.github.vitormozer9.autoworks_api.exceptions.backend.src.main.java.com.github.vitormozer9.oficina_management.exceptions;

import java.time.Instant;
import java.util.List;

public record ErrorResponseDTO(
        Instant timestamp,
        int status,
        String error,
        String message,
        String path,
        List<FieldErrorDTO> fields
) {
}
