package com.projects.BookTradeHub.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "tb_book")
public class Book implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;
	private String author;
	private Integer year;
	@Column(columnDefinition = "TEXT")
	private String imgUrl;
	
	@ManyToOne
    @JoinColumn(name = "user_Wish_id")
	private User userWish;
	
	@ManyToOne
    @JoinColumn(name = "user_My_id")
	private User userMy;
	
	@OneToMany(mappedBy = "bookOffered")
	private List<Exchange> exchangesOffered = new ArrayList<>();
	
	@OneToMany(mappedBy = "bookRecieved")
	private List<Exchange> exchangesRecieved = new ArrayList<>();

	public Book() {}

	public Book(Long id, String title, String author, Integer year, String imgUrl, User userWish, User userMy) {
		super();
		this.id = id;
		this.title = title;
		this.author = author;
		this.year = year;
		this.imgUrl = imgUrl;
		this.userWish = userWish;
		this.userMy = userMy;
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

	public User getUserWish() {
		return userWish;
	}

	public void setUserWish(User userWish) {
		this.userWish = userWish;
	}

	public User getUserMy() {
		return userMy;
	}

	public void setUserMy(User userMy) {
		this.userMy = userMy;
	}

	public List<Exchange> getExchangesOffered() {
		return exchangesOffered;
	}

	public List<Exchange> getExchangesRecieved() {
		return exchangesRecieved;
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
		Book other = (Book) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
