package com.projects.BookTradeHub.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.BookTradeHub.dto.BookDTO;
import com.projects.BookTradeHub.entities.Book;
import com.projects.BookTradeHub.entities.Exchange;
import com.projects.BookTradeHub.entities.User;
import com.projects.BookTradeHub.repositories.BookRepository;
import com.projects.BookTradeHub.repositories.ExchangeRepository;
import com.projects.BookTradeHub.repositories.UserRepository;
import com.projects.BookTradeHub.services.exceptions.DataBaseException;
import com.projects.BookTradeHub.services.exceptions.ResourceNotFoundException;

@Service
public class BookService {

	@Autowired
	private BookRepository repository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ExchangeRepository exchangeRepository;

	@Transactional(readOnly = true)
	public Page<BookDTO> findAllPaged(Pageable pageable) {
		Page<Book> list = repository.findAll(pageable);
		return list.map(x -> new BookDTO(x));
	}

	@Transactional(readOnly = true)
	public BookDTO findById(Long id) {
		Optional<Book> obj = repository.findById(id);
		Book entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new BookDTO(entity);
	}

	@Transactional
	public BookDTO insert(BookDTO dto) {
		Book entity = new Book();
		copyDtoToEntity(dto ,entity);
		entity = repository.save(entity);
		return new BookDTO(entity);
	}

	@Transactional
	public BookDTO update(Long id, BookDTO dto) {
		try {
			Book entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new BookDTO(entity);
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
	
	private void copyDtoToEntity(BookDTO dto, Book entity) {
		entity.setTitle(dto.getTitle());
		entity.setAuthor(dto.getAuthor());
		entity.setYear(dto.getYear());
		entity.setImgUrl(dto.getImgUrl());
		
		for (Long userId : dto.getUsersMyId()) {
			User user = userRepository.getOne(userId);
			entity.getUsersMy().add(user);
		}
		
		for (Long userId : dto.getUsersWishId()) {
			User user = userRepository.getOne(userId);
			entity.getUsersWish().add(user);
		}
		
		for (Long exchangeId : dto.getExchangesOfferedId()) {
			Exchange exchange = exchangeRepository.getOne(exchangeId);
			entity.getExchangesOffered().add(exchange);
		}
		
		for (Long exchangeId : dto.getExchangesRecievedId()) {
			Exchange exchange = exchangeRepository.getOne(exchangeId);
			entity.getExchangesRecieved().add(exchange);
		}
		
	}

}
