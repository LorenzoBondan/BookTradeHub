package com.projects.BookTradeHub.resources;

import java.net.URI;

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

import com.projects.BookTradeHub.dto.ExchangeDTO;
import com.projects.BookTradeHub.entities.User;
import com.projects.BookTradeHub.entities.enums.Status;
import com.projects.BookTradeHub.services.AuthService;
import com.projects.BookTradeHub.services.ExchangeService;

@RestController
@RequestMapping(value = "/exchanges")
public class ExchangeResource {

	@Autowired
	private ExchangeService service;
	
	@Autowired
	private AuthService authService;
	
	@GetMapping
	public ResponseEntity<Page<ExchangeDTO>> findAll(Pageable pageable)	{		
		Page<ExchangeDTO> list = service.findAllPaged(pageable);	
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<ExchangeDTO> findById(@PathVariable Long id) {
		ExchangeDTO dto = service.findById(id);	
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping
	public ResponseEntity<ExchangeDTO> insert (@RequestBody ExchangeDTO dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);	
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<ExchangeDTO> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping(value = "/status/{status}")
	public ResponseEntity<Page<ExchangeDTO>> findByStatus(@PathVariable("status") Status status, @RequestParam(value = "title", defaultValue = "") String title, Pageable pageable) {
	    User me = authService.authenticated();
		Page<ExchangeDTO> list = service.findByStatus(me, status, title.trim(), pageable);
	    return ResponseEntity.ok().body(list);
	}
	
	@PutMapping(value = "/{id}/offerBook/{bookId}")
	public ResponseEntity<ExchangeDTO> offerBook(@PathVariable Long id, @PathVariable Long bookId)	{
		ExchangeDTO newDto = service.offerBook(id, bookId);
		return ResponseEntity.ok().body(newDto);
	}
	
	@PutMapping(value = "/{id}/acceptOffer")
	public ResponseEntity<ExchangeDTO> acceptOffer(@PathVariable Long id)	{
		ExchangeDTO newDto = service.acceptOffer(id);
		return ResponseEntity.ok().body(newDto);
	}
	
	@PutMapping(value = "/{id}/rejectOfferAndPendingAgain")
	public ResponseEntity<ExchangeDTO> rejectOfferAndPendingAgain(@PathVariable Long id)	{
		ExchangeDTO newDto = service.rejectOfferAndPendingAgain(id);
		return ResponseEntity.ok().body(newDto);
	}
	
	@PutMapping(value = "/{id}/rejectOfferAndCancel")
	public ResponseEntity<ExchangeDTO> rejectOfferAndCancel(@PathVariable Long id)	{
		ExchangeDTO newDto = service.rejectOfferAndCancel(id);
		return ResponseEntity.ok().body(newDto);
	}
	
	@PutMapping(value = "/{id}/cancelExchange")
	public ResponseEntity<ExchangeDTO> cancelExchange(@PathVariable Long id)	{
		ExchangeDTO newDto = service.cancelExchange(id);
		return ResponseEntity.ok().body(newDto);
	}
	
}
