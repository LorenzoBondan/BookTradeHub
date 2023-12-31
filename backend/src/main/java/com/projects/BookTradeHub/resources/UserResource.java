package com.projects.BookTradeHub.resources;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.projects.BookTradeHub.dto.UserDTO;
import com.projects.BookTradeHub.dto.UserInsertDTO;
import com.projects.BookTradeHub.dto.UserUpdateDTO;
import com.projects.BookTradeHub.services.UserService;

@RestController
@RequestMapping(value = "/users")
public class UserResource {

	@Autowired
	private UserService service;
	
	@GetMapping
	public ResponseEntity<Page<UserDTO>> findAll(@RequestParam(value = "name", defaultValue = "") String name, Pageable pageable) {
		Page<UserDTO> list = service.findAllPaged(name.trim(), pageable);	
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}") 
	public ResponseEntity<UserDTO> findById(@PathVariable Long id) {
		UserDTO dto = service.findById(id);	
		return ResponseEntity.ok().body(dto);
	}
	
	@GetMapping(value = "/email/{email}") 
	public ResponseEntity<UserDTO> findByEmail(@PathVariable String email) {
		UserDTO dto = service.findByEmail(email);	
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping
	public ResponseEntity<UserDTO> insert (@Valid @RequestBody UserInsertDTO dto) {
		UserDTO newDto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(newDto.getId()).toUri();
		return ResponseEntity.created(uri).body(newDto);	
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<UserDTO> update(@PathVariable Long id, @Valid @RequestBody UserUpdateDTO dto)	{
		UserDTO newDto = service.update(id, dto);
		return ResponseEntity.ok().body(newDto);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<UserDTO> delete(@PathVariable Long id){
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}/addToMyList/{bookId}")
	public ResponseEntity<UserDTO> addToMyList(@PathVariable Long id, @PathVariable Long bookId)	{
		UserDTO newDto = service.addBookToMyList(id, bookId);
		return ResponseEntity.ok().body(newDto);
	}
	
	@PutMapping(value = "/{id}/removeFromMyList/{bookId}")
	public ResponseEntity<UserDTO> removeFromMyList(@PathVariable Long id, @PathVariable Long bookId)	{
		UserDTO newDto = service.removeBookFromMyList(id, bookId);
		return ResponseEntity.ok().body(newDto);
	}
	
	@PutMapping(value = "/{id}/addToWishList/{bookId}")
	public ResponseEntity<UserDTO> addToWishList(@PathVariable Long id, @PathVariable Long bookId)	{
		UserDTO newDto = service.addBookToWishList(id, bookId);
		return ResponseEntity.ok().body(newDto);
	}
	
	@PutMapping(value = "/{id}/removeFromWishList/{bookId}")
	public ResponseEntity<UserDTO> removeFromWishList(@PathVariable Long id, @PathVariable Long bookId)	{
		UserDTO newDto = service.removeBookFromWishList(id, bookId);
		return ResponseEntity.ok().body(newDto);
	}
}
