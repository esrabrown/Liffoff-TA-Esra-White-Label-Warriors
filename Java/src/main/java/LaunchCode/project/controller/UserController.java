package LaunchCode.project.controller;

import LaunchCode.project.exception.UserNotFoundException;
import LaunchCode.project.models.User;
import LaunchCode.project.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

        @Autowired
        private UserRepository userRepository;

        @PostMapping("/user")
        User newUser(@RequestBody User newUser) {
            return userRepository.save(newUser);
        }

        @GetMapping("/users")
        List<User> getAllUsers() {
            return userRepository.findAll();
        }

        @GetMapping("/user/{id}")
        User getUserById(@PathVariable Integer id) {
            return userRepository.findById(id)
                    .orElseThrow(() -> new UserNotFoundException(id));
        }

        @PutMapping("/user/{id}")
        User updateUser(@RequestBody User newUser, @PathVariable Integer id) {
            return userRepository.findById(id)
                    .map(user -> {
                        user.setUsername(newUser.getUsername());
                        user.setFirstName(newUser.getFirstName());
                        user.setLastName(newUser.getLastName());
                        user.setDefaultCurrency(newUser.getDefaultCurrency());
                        return userRepository.save(user);
                    }).orElseThrow(() -> new UserNotFoundException(id));
        }

        @DeleteMapping("/user/{id}")
        String deleteUser(@PathVariable Integer id){
            if(!userRepository.existsById(id)){
                throw new UserNotFoundException(id);
            }
            userRepository.deleteById(id);
            return  "User with id "+id+" has been deleted success.";
        }

}
