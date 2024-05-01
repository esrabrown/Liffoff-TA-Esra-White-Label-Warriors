//package LaunchCode.project.controller;
//import LaunchCode.project.service.GoogleAuthService;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import jakarta.servlet.http.Cookie;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.extern.slf4j.Slf4j;
//import org.objectweb.asm.TypeReference;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Base64;
//import java.util.Map;
//import java.util.concurrent.TimeUnit;
//
//@Slf4j
//@RestController
//public class GoogleAuthController {
//
//    @Autowired
//    private GoogleAuthService googleAuthService;
//
//    private final long JWT_TOKEN_VALIDITY = 5*60*60;
//    @ResponseBody
//    @GetMapping("/api/auth/google")
//    public String googleLogin(@RequestParam("credential") String credential, HttpServletResponse response) {
//        String token = googleAuthService.getGoogleToken(credential);
//
//        Cookie cookie = new Cookie("jwtToken", token);
//        cookie.setHttpOnly(true);
//        cookie.setSecure(true);
//        cookie.setMaxAge((int) TimeUnit.MINUTES.toSeconds(JWT_TOKEN_VALIDITY));
//        cookie.setPath("/");
//        response.addCookie(cookie);
//
//        return "/auth/success";
//    }
//
//     public String getGoogleToken(String credential) {
//        String[] credentialParts = credential.split("\\.");
//        String body = new String(Base64.getUrlDecoder().decode(credentialParts[1]));
//
//        String jwtToken = "";
//
//        ObjectMapper objectMapper = new ObjectMapper();
//
//        try {
//            Map<String, Object> map = objectMapper.readValue(body, new TypeReference<Map<String, Object>>(){});
//            String id = map.get("email").toString();
//            String username=map.get("name").toString();
//
//            log.info(id);
//            log.info(username);
//
//            jwtToken = jwtTokenProvider.generateToken(id, username);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        return jwtToken;
//     }
     //comment below out
//
//    private final WebClient webClient;
//
//    public GoogleAuthController(WebClient.Builder webClientBuilder) {
//        this.webClient = webClientBuilder.baseUrl("https://oauth2.googleapis.com").build();
//    }
//
//    @PostMapping("/api/auth/google")
//    public Mono<Object> authenticateWithGoogle(@RequestBody AuthRequest request) {
//        String code = request.getCode();
//        String clientId = "YOUR_CLIENT_ID";
//        String clientSecret = "YOUR_CLIENT_SECRET";
//        String redirectUri = "YOUR_REDIRECT_URI";
//        String grantType = "authorization_code";
//
//        return webClient.post()
//                .uri("/token")
//                .header("Content-Type", "application/x-www-form-urlencoded")
//                .body(BodyInserters.fromFormData("code", code)
//                        .with("client_id", clientId)
//                        .with("client_secret", clientSecret)
//                        .with("redirect_uri", redirectUri)
//                        .with("grant_type", grantType))
//                .retrieve()
//                .bodyToMono(Object.class);
//    }
//
//    public static class AuthRequest {
//        private String code;
//
//        public String getCode() {
//            return code;
//        }
//
//        public void setCode(String code) {
//            this.code = code;
//        }
//    }
//}