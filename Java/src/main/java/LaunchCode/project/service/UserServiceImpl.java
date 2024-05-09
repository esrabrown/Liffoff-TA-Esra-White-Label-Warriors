package LaunchCode.project.service;

import LaunchCode.project.models.User;
import LaunchCode.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User getUserById() {
        return null;
    }

    @Override
    public User getUserById(Integer id) {
        User user = userRepository.findById(id).get();
        return user;
    }

    @Override
    public List<User> returnAllUsers() {
        return userRepository.findAll();
    }
}
