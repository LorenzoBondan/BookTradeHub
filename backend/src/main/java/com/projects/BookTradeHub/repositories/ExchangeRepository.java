package com.projects.BookTradeHub.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.projects.BookTradeHub.entities.Exchange;
import com.projects.BookTradeHub.entities.ExchangesByStatusProjection;
import com.projects.BookTradeHub.entities.User;
import com.projects.BookTradeHub.entities.enums.Status;

@Repository
public interface ExchangeRepository extends JpaRepository<Exchange,Long>{

	@Query("SELECT obj FROM Exchange obj WHERE "
			+ "((obj.creator = :user) OR "
			+ "(obj.reciever = :user)) AND "
			+ "(obj.status = :status) AND "
			+ "(UPPER(obj.title) LIKE UPPER(CONCAT('%', :title, '%')) ) "
			+ "ORDER BY obj.creationTime DESC")
	Page<Exchange> findByStatus(User user, Status status, String title, Pageable pageable);
	
	@Query("SELECT t.status AS status, COUNT(t.id) AS sum FROM Exchange t WHERE ((t.creator = :user) OR (t.reciever = :user)) GROUP BY t.status")
	List<ExchangesByStatusProjection> exchangesByStatus(User user);
}
