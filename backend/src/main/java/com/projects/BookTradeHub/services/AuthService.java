package com.projects.BookTradeHub.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.BookTradeHub.entities.User;
import com.projects.BookTradeHub.repositories.UserRepository;
import com.projects.BookTradeHub.services.exceptions.ForbiddenException;
import com.projects.BookTradeHub.services.exceptions.UnauthorizedException;

@Service
public class AuthService {
	
	@Autowired
	private UserRepository userRepository;

	@Transactional(readOnly = true)
	public User authenticated() {
		try {
			String username = SecurityContextHolder.getContext().getAuthentication().getName(); // PEGA O NOME DO USUÁRIO QUE JÁ FOI RECONHECIDO PELO SPRING SECURITY
			return userRepository.findByEmail(username);
		}
		catch(Exception e) {
			throw new UnauthorizedException("Invalid user");
		}
	}
	
	public void validateSelfOrAdmin(Long userId) { // VERIFICAR SE O USUÁRIO INFORMADO É O QUE ESTÁ LOGADO OU É ADMIN, SE SIM, VAI PASSAR, SE NÃO, GERA EXCEÇÃO
		User user = authenticated();
		
		if(!user.getId().equals(userId) && !user.hasRole("ROLE_ADMIN")) { //NÃO FOR ADMIN 
			throw new ForbiddenException("Access denied");
		}
	}
}