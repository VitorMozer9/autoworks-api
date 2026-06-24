package com.github.vitormozer9.autoworks_api.modules.auth.useCases;

import com.github.vitormozer9.autoworks_api.exceptions.BusinessException;
import com.github.vitormozer9.autoworks_api.modules.auth.dtos.LoginResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.auth.dtos.RegisterRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.users.entities.User;
import com.github.vitormozer9.autoworks_api.modules.users.repositories.UserRepository;
import com.github.vitormozer9.autoworks_api.providers.JwtProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RegisterUserUseCase {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public RegisterUserUseCase(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
    }

    @Transactional
    public LoginResponseDTO execute(RegisterRequestDTO request) {
        String email = request.email().trim().toLowerCase();
        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new BusinessException("E-mail já cadastrado");
        }

        User user = userRepository.save(new User(email, passwordEncoder.encode(request.senha())));
        return new LoginResponseDTO(jwtProvider.generateToken(user.getId(), user.getEmail()));
    }
}
