package com.merch.userservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.merch.userservice.entity")
public class MerchandisingApplication {

	public static void main(String[] args) {

		SpringApplication.run(MerchandisingApplication.class, args);
	}

}
