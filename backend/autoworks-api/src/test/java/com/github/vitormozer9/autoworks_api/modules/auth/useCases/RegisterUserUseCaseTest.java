package com.github.vitormozer9.autoworks_api.modules.auth.useCases;

import com.github.vitormozer9.autoworks_api.exceptions.BusinessException;
import com.github.vitormozer9.autoworks_api.modules.auth.dtos.LoginResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.auth.dtos.RegisterRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.users.entities.User;
import com.github.vitormozer9.autoworks_api.modules.users.repositories.UserRepository;
import com.github.vitormozer9.autoworks_api.providers.JwtProvider;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RegisterUserUseCaseTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtProvider jwtProvider;

    @InjectMocks
    private RegisterUserUseCase registerUserUseCase;

    @Test
    void shouldRegisterUserWithEncodedPasswordAndReturnToken() {
        RegisterRequestDTO request = new RegisterRequestDTO("USER@EMAIL.COM", "123456");
        when(userRepository.existsByEmailIgnoreCase("user@email.com")).thenReturn(false);
        when(passwordEncoder.encode("123456")).thenReturn("encoded-password");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(jwtProvider.generateToken(any(), eq("user@email.com"))).thenReturn("jwt-token");

        LoginResponseDTO response = registerUserUseCase.execute(request);

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());
        assertThat(userCaptor.getValue().getEmail()).isEqualTo("user@email.com");
        assertThat(userCaptor.getValue().getPasswordHash()).isEqualTo("encoded-password");
        assertThat(response.token()).isEqualTo("jwt-token");
    }

    @Test
    void shouldRejectDuplicatedEmail() {
        RegisterRequestDTO request = new RegisterRequestDTO("user@email.com", "123456");
        when(userRepository.existsByEmailIgnoreCase("user@email.com")).thenReturn(true);

        assertThatThrownBy(() -> registerUserUseCase.execute(request))
                .isInstanceOf(BusinessException.class)
                .hasMessage("E-mail já cadastrado");

        verify(userRepository, never()).save(any(User.class));
        verify(jwtProvider, never()).generateToken(anyLong(), any());
    }
}
