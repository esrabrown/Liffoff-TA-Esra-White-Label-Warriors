package LaunchCode.project.service;

import LaunchCode.project.models.User;

import java.util.Optional;

public interface UserService {
    Optional<User> findByEmail(String email);

    void save(User user);
}
