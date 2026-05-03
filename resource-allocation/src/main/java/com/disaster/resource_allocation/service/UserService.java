package com.disaster.resource_allocation.service;

import com.disaster.resource_allocation.model.user;
import com.disaster.resource_allocation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public user createUser(user user) {
        return userRepository.save(user);
    }

    public List<user> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<user> getUserById(UUID id) {
        return userRepository.findById(id);
    }

    public user updateUser(UUID id, user user) {
        user.setId(id);
        return userRepository.save(user);
    }

    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }
}