package com.github.vitormozer9.autoworks_api.modules.auth.useCases;

import com.github.vitormozer9.autoworks_api.exceptions.UnauthorizedException;
import com.github.vitormozer9.autoworks_api.modules.auth.dtos.LoginRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.auth.dtos.LoginResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.users.entities.User;
import com.github.vitormozer9.autoworks_api.modules.users.repositories.UserRepository;
import com.github.vitormozer9.autoworks_api.providers.JwtProvider;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class LoginUserUseCaseTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtProvider jwtProvider;

    @InjectMocks
    private LoginUserUseCase loginUserUseCase;

    @Test
    void shouldLoginAndReturnTokenWhenCredentialsAreValid() {
        User user = new User("user@email.com", "encoded-password");
        when(userRepository.findByEmailIgnoreCase("user@email.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("123456", "encoded-password")).thenReturn(true);
        when(jwtProvider.generateToken(any(), eq("user@email.com"))).thenReturn("jwt-token");

        LoginResponseDTO response = loginUserUseCase.execute(new LoginRequestDTO("USER@EMAIL.COM", "123456"));

        assertThat(response.token()).isEqualTo("jwt-token");
    }

    @Test
    void shouldRejectInvalidPassword() {
        User user = new User("user@email.com", "encoded-password");
        when(userRepository.findByEmailIgnoreCase("user@email.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrong", "encoded-password")).thenReturn(false);

        assertThatThrownBy(() -> loginUserUseCase.execute(new LoginRequestDTO("user@email.com", "wrong")))
                .isInstanceOf(UnauthorizedException.class)
                .hasMessage("Credenciais inválidas");

        verify(jwtProvider, never()).generateToken(anyLong(), any());
    }

    @Test
    void shouldRejectUnknownEmail() {
        when(userRepository.findByEmailIgnoreCase("missing@email.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> loginUserUseCase.execute(new LoginRequestDTO("missing@email.com", "123456")))
                .isInstanceOf(UnauthorizedException.class)
                .hasMessage("Credenciais inválidas");
    }
}
