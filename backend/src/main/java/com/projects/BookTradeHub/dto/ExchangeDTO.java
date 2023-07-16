package com.projects.BookTradeHub.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import com.projects.BookTradeHub.entities.Exchange;
import com.projects.BookTradeHub.entities.enums.Status;

public class ExchangeDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private Status status;
	private LocalDateTime creationTime;
	private UserDTO creator;
	private UserDTO reciever;
	private BookDTO bookOffered;
	private BookDTO bookRecieved;

	public ExchangeDTO() {}

	public ExchangeDTO(Long id, Status status, LocalDateTime creationTime, UserDTO creator, UserDTO reciever,
			BookDTO bookOffered, BookDTO bookRecieved) {
		super();
		this.id = id;
		this.status = status;
		this.creationTime = creationTime;
		this.creator = creator;
		this.reciever = reciever;
		this.bookOffered = bookOffered;
		this.bookRecieved = bookRecieved;
	}
	
	public ExchangeDTO(Exchange entity) {
		this.id = entity.getId();
		this.status = entity.getStatus();
		this.creationTime = entity.getCreationTime();
		this.creator = new UserDTO(entity.getCreator());
		this.reciever = new UserDTO(entity.getReciver());
		this.bookOffered = new BookDTO(entity.getBookOffered());
		this.bookRecieved = new BookDTO(entity.getBookRecieved());
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public LocalDateTime getCreationTime() {
		return creationTime;
	}

	public void setCreationTime(LocalDateTime creationTime) {
		this.creationTime = creationTime;
	}

	public UserDTO getCreator() {
		return creator;
	}

	public void setCreator(UserDTO creator) {
		this.creator = creator;
	}

	public UserDTO getReciever() {
		return reciever;
	}

	public void setReciever(UserDTO reciever) {
		this.reciever = reciever;
	}

	public BookDTO getBookOffered() {
		return bookOffered;
	}

	public void setBookOffered(BookDTO bookOffered) {
		this.bookOffered = bookOffered;
	}

	public BookDTO getBookRecieved() {
		return bookRecieved;
	}

	public void setBookRecieved(BookDTO bookRecieved) {
		this.bookRecieved = bookRecieved;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ExchangeDTO other = (ExchangeDTO) obj;
		return Objects.equals(id, other.id);
	}
	
}
