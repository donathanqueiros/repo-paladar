package br.com.paladar.backend.config;


import org.springframework.context.annotation.Bean;

//@EnableWebSecurity
//@EnableAuthorizationServer
//@EnableResourceServer
//public class SegurancaConfig extends WebSecurityConfigurerAdapter {
//
//    @Bean
//    @Override
//    protected AuthenticationManager authenticationManager() throws Exception {
//        return super.authenticationManager();
//    }
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        String login = "root";
//        String senha = "root";
//
//
//        auth.inMemoryAuthentication().withUser(login).password(senha).roles("ADMIN");
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder(){
//        return NoOpPasswordEncoder.getInstance();
//    }
//}
