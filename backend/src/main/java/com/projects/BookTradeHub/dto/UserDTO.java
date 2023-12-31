package com.projects.BookTradeHub.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.projects.BookTradeHub.entities.User;

public class UserDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	@NotBlank(message = "Campo obrigatório")
	private String name;
	@Email(message = "Favor entrar com um email válido")
	private String email;
	private String imgUrl;
	
	private List<RoleDTO> roles = new ArrayList<>();
	
	private List<NotificationDTO> notifications = new ArrayList<>(); 
	
	private List<BookDTO> myBooks = new ArrayList<>();
	
	private List<BookDTO> wishList = new ArrayList<>();
	
	private List<Long> exchangesCreatedId = new ArrayList<>();
	
	private List<Long> exchangesReceivedId = new ArrayList<>();
	
	public UserDTO() {}

	public UserDTO(Long id, String name, String email, String password, String imgUrl) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.imgUrl = imgUrl;
	}
	
	public UserDTO(User entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.email = entity.getEmail();
		this.imgUrl = entity.getImgUrl();
		
		entity.getRoles().forEach(rol -> this.roles.add(new RoleDTO(rol)));
		entity.getNotifications().forEach(not -> this.notifications.add(new NotificationDTO(not)));
		entity.getMyBooks().forEach(book -> this.myBooks.add(new BookDTO(book)));
		entity.getWishList().forEach(book -> this.wishList.add(new BookDTO(book)));
		entity.getExchangesReceived().forEach(ex -> this.exchangesReceivedId.add(ex.getId()));
		entity.getExchangesCreated().forEach(ex -> this.exchangesCreatedId.add(ex.getId()));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public List<RoleDTO> getRoles() { 
		return roles;
	}

	public List<NotificationDTO> getNotifications() {
		return notifications;
	}

	public List<BookDTO> getMyBooks() {
		return myBooks;
	}

	public List<BookDTO> getWishList() {
		return wishList;
	}

	public List<Long> getExchangesCreatedId() {
		return exchangesCreatedId;
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
		UserDTO other = (UserDTO) obj;
		return Objects.equals(id, other.id);
	}
}
