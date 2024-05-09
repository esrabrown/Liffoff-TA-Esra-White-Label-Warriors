package LaunchCode.project.service;

import LaunchCode.project.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {
    User getUserById();
    User getUserById(Integer id);
    public List<User> returnAllUsers();
}
