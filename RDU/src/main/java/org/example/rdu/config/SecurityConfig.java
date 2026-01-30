package org.example.rdu.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())

                .cors(cors -> cors.configurationSource(request -> {
                    var corsConfiguration = new org.springframework.web.cors.CorsConfiguration();


                    corsConfiguration.setAllowedOrigins(java.util.List.of("http://localhost:5173"));


                    corsConfiguration.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

                    corsConfiguration.setAllowedHeaders(java.util.List.of("*"));

                    corsConfiguration.setAllowCredentials(true);

                    return corsConfiguration;
                }))

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/category/**").permitAll()
                        .requestMatchers("/community/**").permitAll()
                        .requestMatchers("/session/**").permitAll()
                        .requestMatchers("/user/**").permitAll()
                        .requestMatchers("/news/**").permitAll()

                        .anyRequest().authenticated()
                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
