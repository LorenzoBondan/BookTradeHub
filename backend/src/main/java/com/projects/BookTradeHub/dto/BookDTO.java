package com.projects.BookTradeHub.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.projects.BookTradeHub.entities.Book;

public class BookDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String title;
	private String author;
	private Integer year;
	private String imgUrl;
	
	private List<Long> usersMyId = new ArrayList<>();
	
	private List<Long> usersWishId = new ArrayList<>();
	
	private List<Long> exchangesOfferedId = new ArrayList<>();
	
	private List<Long> exchangesReceivedId = new ArrayList<>();
	
	public BookDTO() {}

	public BookDTO(Long id, String title, String author, Integer year, String imgUrl) {
		super();
		this.id = id;
		this.title = title;
		this.author = author;
		this.year = year;
		this.imgUrl = imgUrl;
	}
	
	public BookDTO(Book entity) {
		this.id = entity.getId();
		this.title = entity.getTitle();
		this.author = entity.getAuthor();
		this.year = entity.getYear();
		this.imgUrl = entity.getImgUrl();
		
		entity.getUsersMy().forEach(user -> this.usersMyId.add(user.getId()));
		entity.getUsersWish().forEach(user -> this.usersWishId.add(user.getId()));
		entity.getExchangesOffered().forEach(ex -> this.exchangesOfferedId.add(ex.getId()));
		entity.getExchangesReceived().forEach(ex -> this.exchangesReceivedId.add(ex.getId()));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public List<Long> getUsersMyId() {
		return usersMyId;
	}

	public List<Long> getUsersWishId() {
		return usersWishId;
	}

	public List<Long> getExchangesOfferedId() {
		return exchangesOfferedId;
	}

	public List<Long> getExchangesReceivedId() {
		return exchangesReceivedId;
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
		BookDTO other = (BookDTO) obj;
		return Objects.equals(id, other.id);
	}
	
}
