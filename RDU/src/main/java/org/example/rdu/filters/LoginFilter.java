package org.example.rdu.filters;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.example.rdu.entities.UserType;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;
import java.util.Collections;

@Component
@Order(1)
public class LoginFilter implements Filter {

    @Override
    public void doFilter(
            ServletRequest servletRequest,
            ServletResponse servletResponse,
            FilterChain filterChain
    ) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;


        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        String path = request.getServletPath();
        System.out.println("path: " + path);

        boolean publicPaths =(path.startsWith("/news") || path.startsWith("/categories") ||  path.startsWith("/users") ||
                path.startsWith("/category") || path.startsWith("/community")) && request.getMethod().equals("GET");

        boolean authPath = path.startsWith("/session") && request.getMethod().equals("POST");


        if (publicPaths || authPath) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }


        HttpSession session = request.getSession(false);
        boolean isLoggedIn =
                session != null && session.getAttribute("username") != null;

        if (isLoggedIn) {
            String username = (String) session.getAttribute("username");
            UserType userType = (UserType) session.getAttribute("role");


            Collection<GrantedAuthority> authorities = userType == UserType.admin
                    ? Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"))
                    : Collections.emptyList();

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(username, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            filterChain.doFilter(servletRequest, servletResponse);
        } else {
            response.sendError(
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "User not authenticated"
            );
        }
    }
}
