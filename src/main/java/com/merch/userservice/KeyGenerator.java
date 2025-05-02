package com.merch.userservice;

import java.util.Base64;
import io.jsonwebtoken.security.Keys;

public class KeyGenerator {
    public static void main(String[] args) {
        byte[] key = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256).getEncoded();
        String base64Key = Base64.getEncoder().encodeToString(key);
        System.out.println("Generated Key: " + base64Key);
    }
}
