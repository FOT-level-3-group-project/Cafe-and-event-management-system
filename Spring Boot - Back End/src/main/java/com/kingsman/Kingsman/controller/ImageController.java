package com.kingsman.Kingsman.controller;


import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;


import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/food")
public class ImageController {
    private final String uploadDir = "./src/main/resources/static/images"; // Path to your local folder where images are stored

    @GetMapping("/image/{imageName:.+}") //show food image using the image name
    public Resource downloadImage(@PathVariable String imageName) throws MalformedURLException {
        Path imagePath = Paths.get(uploadDir).resolve(imageName);
        Resource resource = new UrlResource(imagePath.toUri());
        if (resource.exists() || resource.isReadable()) {
            return resource;
        } else {
            throw new RuntimeException("Failed to load image: " + imageName);
        }
    }
}
