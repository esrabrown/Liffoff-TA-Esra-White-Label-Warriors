package LaunchCode.project.controller;

//import LaunchCode.project.models.AuthenticationResponse;
//import LaunchCode.project.models.User;
//import LaunchCode.project.service.AuthenticationService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
import LaunchCode.project.service.TokenService;
import LaunchCode.project.models.LoginRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@CrossOrigin //origins = localhost3000
public class AuthenticationController {

    private static final Logger LOG = LoggerFactory.getLogger(AuthenticationController.class);

    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationController(TokenService tokenService, AuthenticationManager authenticationManager) {
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/token")
    public String token(@RequestBody LoginRequest userLogin) throws AuthenticationException {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLogin.username(), userLogin.password()));
        return tokenService.generateToken(authentication);
    }
//    private final AuthenticationService authenticationService;
//
//    public AuthenticationController(AuthenticationService authenticationService) {
//        this.authenticationService = authenticationService;
//    }
//
//    @PostMapping("/register")
//    public ResponseEntity<AuthenticationResponse> register (@RequestBody User request) {
//        return ResponseEntity.ok(authenticationService.register(request));
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<AuthenticationResponse> login(@RequestBody User request) {
//        return ResponseEntity.ok(authenticationService.authenticate(request));
//    }
//
//    @GetMapping("/demo")
//    public ResponseEntity<String> demo() {
//        return ResponseEntity.ok("Demo");
//    }
}
