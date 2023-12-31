package com.projects.BookTradeHub.services;

import java.time.LocalDateTime;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.BookTradeHub.dto.ExchangeDTO;
import com.projects.BookTradeHub.entities.Book;
import com.projects.BookTradeHub.entities.Exchange;
import com.projects.BookTradeHub.entities.Notification;
import com.projects.BookTradeHub.entities.User;
import com.projects.BookTradeHub.entities.enums.Status;
import com.projects.BookTradeHub.repositories.BookRepository;
import com.projects.BookTradeHub.repositories.ExchangeRepository;
import com.projects.BookTradeHub.repositories.NotificationRepository;
import com.projects.BookTradeHub.repositories.UserRepository;
import com.projects.BookTradeHub.services.exceptions.DataBaseException;
import com.projects.BookTradeHub.services.exceptions.ResourceNotFoundException;

@Service
public class ExchangeService {

	@Autowired
	private ExchangeRepository repository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BookRepository bookRepository;
	
	@Autowired
	private NotificationRepository notificationRepository;

	@Transactional(readOnly = true)
	public Page<ExchangeDTO> findAllPaged(Pageable pageable) {
		Page<Exchange> list = repository.findAll(pageable);
		return list.map(x -> new ExchangeDTO(x));
	}
	
	@Transactional(readOnly = true)
	public Page<ExchangeDTO> findAllDisponible(User user, Status status, String title, Pageable pageable) {
		Page<Exchange> list = repository.findAllDisponible(user, status, title, pageable);
		return list.map(x -> new ExchangeDTO(x));
	}

	@Transactional(readOnly = true)
	public ExchangeDTO findById(Long id) {
		Optional<Exchange> obj = repository.findById(id);
		Exchange entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new ExchangeDTO(entity);
	}

	@Transactional
	public ExchangeDTO insert(ExchangeDTO dto) {
		Exchange entity = new Exchange();
		copyDtoToEntity(dto ,entity);
		entity = repository.save(entity);
		return new ExchangeDTO(entity);
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
	
	private void copyDtoToEntity(ExchangeDTO dto, Exchange entity) {
		entity.setStatus(dto.getStatus());
		entity.setCreationTime(dto.getCreationTime());
		entity.setBookOffered(bookRepository.getOne(dto.getBookOffered().getId()));
		if(dto.getBookReceived() != null) {
			entity.setBookReceived(bookRepository.getOne(dto.getBookReceived().getId()));
		}
		entity.setCreator(userRepository.getOne(dto.getCreator().getId()));
		if(dto.getReceiver() != null) {
			entity.setReceiver(userRepository.getOne(dto.getReceiver().getId()));
		}
	}
	
	@Transactional(readOnly = true)
	public Page<ExchangeDTO> findByStatus(User user, Status status, Pageable pageable) {
		Page<Exchange> list = repository.findByStatus(user, status, pageable);
		return list.map(x -> new ExchangeDTO(x));
	}
	
	@Transactional
	public ExchangeDTO updateStatus(Long id, Status status, String message) {
		try {
			Exchange entity = repository.getOne(id);
			entity.setStatus(status);
			entity = repository.save(entity);
			
			// sending a notification to the creator
			Notification notification = new Notification();
			notification.setUser(entity.getCreator());
			notification.setDescription(message);
			LocalDateTime date = LocalDateTime.now();
			notification.setMoment(date);
			notification.setRead(false);
			notification = notificationRepository.save(notification);
			
			// sending a notification to the receiver
			Notification notification2 = new Notification();
			notification2.setUser(entity.getReceiver());
			notification2.setDescription(message);
			notification2.setMoment(date);
			notification2.setRead(false);
			notification2 = notificationRepository.save(notification2);
			
			return new ExchangeDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
	
	@Transactional
	public ExchangeDTO offerBook(Long id, Long bookId, User user) {
		try {
			Exchange entity = repository.getOne(id);
			if(entity.getStatus() != Status.CANCELED) {
				Book bookReceived = bookRepository.getOne(bookId);
				
				entity.setBookReceived(bookReceived);
				entity.setReceiver(user);
				user = userRepository.save(user);
				entity = repository.save(entity);
				updateStatus(id, Status.PENDING, "The book " + bookReceived.getTitle() + " was offered to the exchange #" + entity.getId() + ".");
				entity = repository.save(entity);
				
				
				return new ExchangeDTO(entity);
			}
			throw new ResourceNotFoundException("Exchange is canceled." + id);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
	
	@Transactional
	public ExchangeDTO acceptOffer(Long id) {
		try {
			Exchange entity = repository.getOne(id);
			if(entity.getBookReceived() != null && 
			entity.getStatus() != Status.CANCELED && 
			entity.getCreator().getMyBooks().contains(entity.getBookOffered()) && 
			entity.getReceiver().getMyBooks().contains(entity.getBookReceived())) {
				updateStatus(id, Status.COMPLETED, "The exchange #" + entity.getId() + " was completed!");
				
				// adding books to creator and to receiver
				entity.getCreator().getMyBooks().add(entity.getBookReceived());
				entity.getCreator().getMyBooks().remove(entity.getBookOffered());
				entity.getReceiver().getMyBooks().add(entity.getBookOffered());
				entity.getReceiver().getMyBooks().remove(entity.getBookReceived());
				
				entity = repository.save(entity);
				return new ExchangeDTO(entity);
			}
			throw new ResourceNotFoundException("Book offered not found or exchange canceled " + id);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
	
	@Transactional
	public ExchangeDTO rejectOfferAndPendingAgain(Long id) {
		try {
			Exchange entity = repository.getOne(id);
			if(entity.getBookReceived() != null && entity.getStatus() != Status.CANCELED) {
				updateStatus(id, Status.PENDING, "The exchange with the book " + entity.getBookReceived().getTitle() + " was rejected. Please offer another book to the exchange #" + entity.getId() + ".");
				entity.setBookReceived(null);
				entity = repository.save(entity);
				return new ExchangeDTO(entity);
			}
			throw new ResourceNotFoundException("Book offered not found or exchange canceled " + id);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
	
	@Transactional
	public ExchangeDTO rejectOfferAndCancel(Long id) {
		try {
			Exchange entity = repository.getOne(id);
			if(entity.getBookReceived() != null && entity.getStatus() != Status.CANCELED) {
				updateStatus(id, Status.CANCELED, "The exchange #" + entity.getId() + " was canceled.");
				entity = repository.save(entity);
				return new ExchangeDTO(entity);
			}
			throw new ResourceNotFoundException("Book offered not found or exchange canceled " + id);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
	
	@Transactional
	public ExchangeDTO cancelExchange(Long id) {
		try {
			Exchange entity = repository.getOne(id);
			updateStatus(id, Status.CANCELED, "The exchange #" + entity.getId() + " was canceled.");
			entity = repository.save(entity);
			return new ExchangeDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
}
