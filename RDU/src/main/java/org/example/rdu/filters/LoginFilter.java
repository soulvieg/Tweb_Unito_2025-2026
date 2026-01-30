package org.example.rdu.filters;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

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

        // ✅ Allow CORS preflight
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        String path = request.getServletPath();

        // ✅ Public endpoints
        if (path.startsWith("/news") || path.startsWith("/session")) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        // ✅ Session authentication
        HttpSession session = request.getSession(false);
        boolean isLoggedIn =
                session != null && session.getAttribute("username") != null;

        if (isLoggedIn) {
            filterChain.doFilter(servletRequest, servletResponse);
        } else {
            response.sendError(
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "User not authenticated"
            );
        }
    }
}
