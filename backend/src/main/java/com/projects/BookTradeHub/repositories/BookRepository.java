package com.projects.BookTradeHub.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projects.BookTradeHub.entities.Book;

@Repository
public interface BookRepository extends JpaRepository<Book,Long>{

}
