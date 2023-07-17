package com.projects.BookTradeHub.entities;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.lang.Nullable;

import com.projects.BookTradeHub.entities.enums.Status;

@Entity
@Table(name = "tb_exchange")
public class Exchange implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Status status;
	@Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
	private LocalDateTime creationTime;
	
	@Nullable
	@ManyToOne
    @JoinColumn(name = "creator_id")
	private User creator;
	
	@Nullable
	@ManyToOne
    @JoinColumn(name = "receiver_id")
	private User receiver;
	
	@Nullable
	@ManyToOne
    @JoinColumn(name = "book_Offered_id")
	private Book bookOffered;
	
	@Nullable
	@ManyToOne
    @JoinColumn(name = "book_Received_id")
	private Book bookReceived;
	
	public Exchange() {}

	public Exchange(Long id, Status status, LocalDateTime creationTime, User creator, User receiver, Book bookOffered,
			Book bookReceived) {
		super();
		this.id = id;
		this.status = status;
		this.creationTime = creationTime;
		this.creator = creator;
		this.receiver = receiver;
		this.bookOffered = bookOffered;
		this.bookReceived = bookReceived;
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

	public User getCreator() {
		return creator;
	}

	public void setCreator(User creator) {
		this.creator = creator;
	}

	public User getReceiver() {
		return receiver;
	}

	public void setReceiver(User receiver) {
		this.receiver = receiver;
	}

	public Book getBookOffered() {
		return bookOffered;
	}

	public void setBookOffered(Book bookOffered) {
		this.bookOffered = bookOffered;
	}

	public Book getBookReceived() {
		return bookReceived;
	}

	public void setBookReceived(Book bookReceived) {
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
		Exchange other = (Exchange) obj;
		return Objects.equals(id, other.id);
	}
	
}
