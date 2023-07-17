package com.projects.BookTradeHub.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.BookTradeHub.dto.BookDTO;
import com.projects.BookTradeHub.dto.NotificationDTO;
import com.projects.BookTradeHub.dto.RoleDTO;
import com.projects.BookTradeHub.dto.UserDTO;
import com.projects.BookTradeHub.dto.UserInsertDTO;
import com.projects.BookTradeHub.dto.UserUpdateDTO;
import com.projects.BookTradeHub.entities.Book;
import com.projects.BookTradeHub.entities.Exchange;
import com.projects.BookTradeHub.entities.Notification;
import com.projects.BookTradeHub.entities.Role;
import com.projects.BookTradeHub.entities.User;
import com.projects.BookTradeHub.repositories.BookRepository;
import com.projects.BookTradeHub.repositories.ExchangeRepository;
import com.projects.BookTradeHub.repositories.NotificationRepository;
import com.projects.BookTradeHub.repositories.RoleRepository;
import com.projects.BookTradeHub.repositories.UserRepository;
import com.projects.BookTradeHub.services.exceptions.DataBaseException;
import com.projects.BookTradeHub.services.exceptions.ResourceNotFoundException;

@Service
public class UserService implements UserDetailsService {

	private static Logger logger = org.slf4j.LoggerFactory.getLogger(UserService.class); 

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository repository;

	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private BookRepository bookRepository;
	
	@Autowired
	private NotificationRepository notificationRepository;
	
	@Autowired
	private ExchangeRepository exchangeRepository;
	
	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(String name, Pageable pageable) {
		Page<User> list = repository.find(name, pageable);
		return list.map(x -> new UserDTO(x));
	}

	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<User> obj = repository.findById(id);
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new UserDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public UserDTO findByEmail(String email) {
		Optional<User> obj = Optional.ofNullable(repository.findByEmail(email));
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO insert(UserInsertDTO dto) {
		User entity = new User();
		copyDtoToEntity(dto, entity);

		entity.setPassword(passwordEncoder.encode(dto.getPassword()));

		entity = repository.save(entity);
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO update(Long id, UserUpdateDTO dto) {
		try {
			User entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new UserDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
	
	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}

		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integrity Violation");
		}
	}

	private void copyDtoToEntity(UserDTO dto, User entity) {

		entity.setName(dto.getName());
		entity.setEmail(dto.getEmail());
		entity.setImgUrl(dto.getImgUrl());

		for (RoleDTO rolDto : dto.getRoles()) {
			Role role = roleRepository.getOne(rolDto.getId());
			entity.getRoles().add(role);
		}
		
		for (NotificationDTO notDto : dto.getNotifications()) {
			Notification notification = notificationRepository.getOne(notDto.getId());
			entity.getNotifications().add(notification);
		}
		
		for (BookDTO bookDto : dto.getMyBooks()) {
			Book book = bookRepository.getOne(bookDto.getId());
			entity.getMyBooks().add(book);
		}
		
		for (BookDTO bookDto : dto.getWishList()) {
			Book book = bookRepository.getOne(bookDto.getId());
			entity.getWishList().add(book);
		}
		
		for (Long exchangeId : dto.getExchangesCreatedId()) {
			Exchange exchange = exchangeRepository.getOne(exchangeId);
			entity.getExchangesCreated().add(exchange);
		}
		
		for (Long exchangeId : dto.getExchangesReceivedId()) {
			Exchange exchange = exchangeRepository.getOne(exchangeId);
			entity.getExchangesReceived().add(exchange);
		}

	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = repository.findByEmail(username);

		if (user == null) {
			logger.error("User not found: " + username);
			throw new UsernameNotFoundException("Email not found");
		}
		logger.info("User found: " + username);
		return user;
	}
	
}
