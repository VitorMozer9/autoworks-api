package com.github.vitormozer9.autoworks_api.modules.auth.controllers;

import com.github.vitormozer9.autoworks_api.modules.auth.dtos.LoginRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.auth.dtos.LoginResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.auth.dtos.RegisterRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.auth.useCases.LoginUserUseCase;
import com.github.vitormozer9.autoworks_api.modules.auth.useCases.RegisterUserUseCase;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final RegisterUserUseCase registerUserUseCase;
    private final LoginUserUseCase loginUserUseCase;

    public AuthController(RegisterUserUseCase registerUserUseCase, LoginUserUseCase loginUserUseCase) {
        this.registerUserUseCase = registerUserUseCase;
        this.loginUserUseCase = loginUserUseCase;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<LoginResponseDTO> register(@Valid @RequestBody RegisterRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(registerUserUseCase.execute(request));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        return ResponseEntity.ok(loginUserUseCase.execute(request));
    }
}
