package com.github.vitormozer9.autoworks_api.modules.auth.useCases;

import com.github.vitormozer9.autoworks_api.exceptions.UnauthorizedException;
import com.github.vitormozer9.autoworks_api.modules.auth.dtos.LoginRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.auth.dtos.LoginResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.users.entities.User;
import com.github.vitormozer9.autoworks_api.modules.users.repositories.UserRepository;
import com.github.vitormozer9.autoworks_api.providers.JwtProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LoginUserUseCase {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public LoginUserUseCase(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
    }

    @Transactional(readOnly = true)
    public LoginResponseDTO execute(LoginRequestDTO request) {
        User user = userRepository.findByEmailIgnoreCase(request.email().trim().toLowerCase())
                .orElseThrow(() -> new UnauthorizedException("Credenciais inválidas"));

        if (!passwordEncoder.matches(request.senha(), user.getPasswordHash())) {
            throw new UnauthorizedException("Credenciais inválidas");
        }

        return new LoginResponseDTO(jwtProvider.generateToken(user.getId(), user.getEmail()));
    }
}
