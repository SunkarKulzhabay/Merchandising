package com.merch.userservice.config;

import com.merch.userservice.security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Настройка CORS
                .csrf(csrf -> csrf.disable()) // Отключаем CSRF, так как используем JWT
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Без сессий, только JWT
                .authorizeHttpRequests(auth -> auth
                        // Разрешаем доступ без аутентификации
                        .requestMatchers("/", "/auth/**", "/error", "/favicon.ico").permitAll()
                        .requestMatchers("/auth/register", "/auth/login").permitAll()
                        // Требуем аутентификацию
                        .requestMatchers("/auth/me").authenticated()
                        // Ограничения по ролям
                        .requestMatchers("/api/users").hasRole("ADMIN")
                        .requestMatchers("/api/stores").hasAnyRole("ADMIN", "MERCHANDISER")
                        .requestMatchers("/api/schedules/**").hasRole("ADMIN")
                        .requestMatchers("/api/tasks/**").hasRole("MERCHANDISER")
                        // Все остальные запросы требуют аутентификации
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form.disable()) // Отключаем стандартную форму логина
                .httpBasic(basic -> basic.disable()) // Отключаем базовую аутентификацию
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class); // Добавляем JWT-фильтр

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        // Разрешённые источники (фронтенд и Android-эмулятор)
        config.setAllowedOrigins(List.of("http://localhost:3000", "http://10.0.2.2:8080"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true); // Разрешаем отправку куки и заголовков авторизации
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}