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
	private UserDTO receiver;
	private BookDTO bookOffered;
	private BookDTO bookReceived;

	public ExchangeDTO() {}

	public ExchangeDTO(Long id, Status status, LocalDateTime creationTime, UserDTO creator, UserDTO receiver,
			BookDTO bookOffered, BookDTO bookReceived) {
		super();
		this.id = id;
		this.status = status;
		this.creationTime = creationTime;
		this.creator = creator;
		this.receiver = receiver;
		this.bookOffered = bookOffered;
		this.bookReceived = bookReceived;
	}
	
	public ExchangeDTO(Exchange entity) {
		this.id = entity.getId();
		this.status = entity.getStatus();
		this.creationTime = entity.getCreationTime();
		this.creator = new UserDTO(entity.getCreator());
		this.receiver = new UserDTO(entity.getReceiver());
		this.bookOffered = new BookDTO(entity.getBookOffered());
		this.bookReceived = new BookDTO(entity.getBookReceived());
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

	public UserDTO getReceiver() {
		return receiver;
	}

	public void setReceiver(UserDTO receiver) {
		this.receiver = receiver;
	}

	public BookDTO getBookOffered() {
		return bookOffered;
	}

	public void setBookOffered(BookDTO bookOffered) {
		this.bookOffered = bookOffered;
	}

	public BookDTO getBookReceived() {
		return bookReceived;
	}

	public void setbookReceiver(BookDTO bookReceived) {
		this.bookReceived = bookReceived;
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
