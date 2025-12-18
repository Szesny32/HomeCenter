package HomeCenter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HomeCenterApplication {

	public static void main(String[] args) {
		System.out.println("DB: " + System.getenv("HOME_CENTER_DB"));
        System.out.println("USER: " + System.getenv("HOME_CENTER_USER"));
        System.out.println("PASSWORD: " + System.getenv("HOME_CENTER_PASSWORD"));
		SpringApplication.run(HomeCenterApplication.class, args);
	}

}
