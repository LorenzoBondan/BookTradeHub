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
	
	@ManyToOne
    @JoinColumn(name = "creator_id")
	private User creator;
	
	@ManyToOne
    @JoinColumn(name = "reciver_id")
	private User reciver;
	
	@ManyToOne
    @JoinColumn(name = "book_Offered_id")
	private Book bookOffered;
	
	@ManyToOne
    @JoinColumn(name = "book_Recieved_id")
	private Book bookRecieved;
	
	public Exchange() {}

	public Exchange(Long id, Status status, LocalDateTime creationTime, User creator, User reciver, Book bookOffered,
			Book bookRecieved) {
		super();
		this.id = id;
		this.status = status;
		this.creationTime = creationTime;
		this.creator = creator;
		this.reciver = reciver;
		this.bookOffered = bookOffered;
		this.bookRecieved = bookRecieved;
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

	public User getReciver() {
		return reciver;
	}

	public void setReciver(User reciver) {
		this.reciver = reciver;
	}

	public Book getBookOffered() {
		return bookOffered;
	}

	public void setBookOffered(Book bookOffered) {
		this.bookOffered = bookOffered;
	}

	public Book getBookRecieved() {
		return bookRecieved;
	}

	public void setBookRecieved(Book bookRecieved) {
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
		Exchange other = (Exchange) obj;
		return Objects.equals(id, other.id);
	}
	
}
