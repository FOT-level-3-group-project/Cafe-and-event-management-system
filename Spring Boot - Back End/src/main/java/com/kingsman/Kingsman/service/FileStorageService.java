package com.kingsman.Kingsman.service;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {
    private final String uploadDir = "./src/main/resources/static/images"; // Path to your local folder where images will be stored

    public String storeFile(MultipartFile file) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Create the directory if it doesn't exist
            Path path = Paths.get(uploadDir);
            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }

            // Generate a unique file name
            String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;

            // Save the file to the upload directory
            Path filePath = Paths.get(uploadDir + File.separator + uniqueFileName);
            Files.copy(file.getInputStream(), filePath);

            // Return the URL of the stored file
            return uniqueFileName; // Assuming the images are served from a directory named "images"
        } catch (IOException ex) {
            throw new RuntimeException("Failed to store file " + fileName, ex);
        }
    }
}

