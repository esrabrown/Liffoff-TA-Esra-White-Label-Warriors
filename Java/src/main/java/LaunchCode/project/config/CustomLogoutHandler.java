//package LaunchCode.project.config;
//
//import LaunchCode.project.models.Token;
//import LaunchCode.project.repository.TokenRepository;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.web.authentication.logout.LogoutHandler;
//
//@Configuration
//public class CustomLogoutHandler implements LogoutHandler {
//    //This class handles logout requests by setting token as logged out in database
//    private final TokenRepository tokenRepository;
//
//    //constructor that initializes tokenRepository field
//    public CustomLogoutHandler(TokenRepository tokenRepository) {
//        this.tokenRepository = tokenRepository;
//    }
//
//    //Method when a user logs out
//    @Override
//    public void logout(HttpServletRequest request, //HTTP request made by the client
//                       HttpServletResponse response, //HTTP response sent back to client
//                       Authentication authentication) { //Auth information of the user logging out
//        //Gets value of auth header (full authentication token) from request
//        String authHeader = request.getHeader("Authorization");
//        //if either of these conditions are true, the request does not contain a valid token and returns without processing
//        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
//            return;
//        }
//        //extracts the token from auth header, skips first 7 characters (length of bearer) to extract token string
//        String token = authHeader.substring(7);
//        //Finds token object using findByToken method of TokenRepo.
//        //If no token is found, storedToken is set to null
//        Token storedToken = tokenRepository.findByToken(token).orElse(null);
//        //If token is found in tokenRepo, token is marked as logged out (.setLoggedOut(true)), saves token back to database
//        if(storedToken != null) {
//            storedToken.setLoggedOut(true);
//            tokenRepository.save(storedToken);
//        }
//    }
//
//}
