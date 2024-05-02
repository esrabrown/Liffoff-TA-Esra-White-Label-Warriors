package LaunchCode.project.service;

import LaunchCode.project.models.Role;
import org.apache.tomcat.util.codec.binary.Base64;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.util.Arrays;

public class KeyPairGen {
    public static void main(String[] args) {
        try{
            KeyPairGenerator kpg = KeyPairGenerator.getInstance("RSA");
            kpg.initialize(2048);
            KeyPair kp = kpg.generateKeyPair();

            String publicKey = Base64.encodeBase64String(kp.getPublic().getEncoded());
            String privateKey = Base64.encodeBase64String(kp.getPrivate().getEncoded());
            JwtService jwtService = new JwtService();

            String jwtToken = jwtService.generateAccessToken("Ajinkya",Role.USER,privateKey);

            System.out.println(jwtService.validateJwtToken(jwtToken,publicKey));

        }catch(Exception e){
            e.printStackTrace();
        }


    }
}
