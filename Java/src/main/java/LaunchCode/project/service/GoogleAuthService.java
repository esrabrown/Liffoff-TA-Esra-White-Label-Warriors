//package LaunchCode.project.service;
//
//import LaunchCode.project.models.GoogleToken;
//import LaunchCode.project.models.GoogleUser;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.*;
//import org.springframework.stereotype.Service;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.client.HttpServerErrorException;
//import org.springframework.web.client.RestTemplate;
//
//@Slf4j
//@Service
//public class GoogleAuthService {
//    @Autowired
//    public UserMapper userMapper;
//
//    @Autowired
//    public JwtTokenProvider jwtTokenProvider;
//
//    @Value("${google.clientId}")
//    private String googleClientId;
//    @Value("${google.secretkey}")
//    private String googleSecretKey;
//
//    public String getGoogleToken(String code) throws HttpServerErrorException {
//        GoogleToken token = new googleToken();
//
//        String request_uri = "http://localhost:3000";
//        String redirect_uri = "http://localhost:8080/api/auth/google";
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//
//        MultiValueMap<String, String> param = new LinkedMultiValueMap<>();
//        param.add("grant_type", "authorization_code");
//        param.add("client_id", googleClientId);
//        param.add("redirect_uri", redirect_uri);
//        param.add("code", code);
//
//        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(param, headers);
//
//        RestTemplate rt = new RestTemplate();
//        ResponseEntity<googleToken> res = rt.postForEntity(request_uri, request, googleToken.class);
//
//        if(res.getStatusCodeValue() == 200) {
//            token = res.getBody();
//
//            User user = this.getUser(token.access_token);
//
//            String id = user.getId().toString();
//            String username = user.google_account.profile.getUsername();
//            String jwtToken = jwtTokenProvider.generateToken(id, username);
//
//            return jwtToken;
//        }
//
//        else return null;
//
//    }
//
//    public GoogleUser getGoogleUser(String token) {
//        String url = "http:google whatever/vwhatever/userwhatever";
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//        headers.set("Authorization", "Bearer" + token);
//
//        HttpEntity<String> entity = new HttpEntity<>(headers);
//        RestTemplate rt = new RestTemplate();
//
//        ResponseEntity<GoogleUser> res = rt.exchange(url, HttpMethod.GET, entity, GoogleUser.class);
//        if (res.getStatusCodeValue() == 200) {
//            GoogleUser googleUser = res.getBody();
//            return googleUser;
//        }
//        else return null;
//    }
//}
