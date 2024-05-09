package LaunchCode.project.controller;

import LaunchCode.project.models.User;
import LaunchCode.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profile")
@CrossOrigin
public class ProfileController {

//    @GetMapping()
//    public UserDetails getUserProfile(@AuthenticationPrincipal UserDetails userDetails) {
//        //Contains authenticated user's info
//        return userDetails;
//    }

    @Autowired
    UserService userService;

    @GetMapping("/all")
    public List<User> returnAllUsers() {
        return userService.returnAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> returnUserById(@PathVariable Integer id) {
        User user= null;
        user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

//    @GetMapping
//    public User fetchUser(@AuthenticationPrincipal User user) {
//        return user;
//    }

    @GetMapping("/user")
    public ResponseEntity<User> getUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(user);
    } //user.tokens=[] when creating a user, data that belongs to user that belongs to token so info isn't pulling correctly
}

