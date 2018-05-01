package ro.uaic.info.ip.proiect.b3.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ro.uaic.info.ip.proiect.b3.authentication.AuthenticationManager;

@Controller
public class WelcomeController {
    @RequestMapping(value="/", method=RequestMethod.GET)
    public String welcome(@CookieValue(value = "user", defaultValue = "-1") String loginCookie, Model model) {
        if (AuthenticationManager.isUserLoggedIn(loginCookie)) {
            return (new DashboardController()).dashboard(model, AuthenticationManager.getUserLoggedIn(loginCookie));
        } else {
            return "login";
        }
    }
}
