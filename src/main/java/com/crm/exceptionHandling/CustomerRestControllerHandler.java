package com.crm.exceptionHandling;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomerRestControllerHandler {

	@ExceptionHandler
	public ResponseEntity<CustomerErrorResponse> handleException(CustomerNotFoundException exc) {
		CustomerErrorResponse error = new CustomerErrorResponse(HttpStatus.NOT_FOUND.value(), exc.getMessage(),
				System.currentTimeMillis());
		System.out.println(exc);
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler
	public ResponseEntity<CustomerErrorResponse> handleException(Exception exc) {

		CustomerErrorResponse error = null;

		if (exc.getClass().toString().contains("ConstraintViolationException")) {
			error = new CustomerErrorResponse(HttpStatus.BAD_REQUEST.value(), "Duplicate customer by email",
					System.currentTimeMillis());
		} else
			error = new CustomerErrorResponse(HttpStatus.BAD_REQUEST.value(), exc.getMessage(),
					System.currentTimeMillis());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);

	}

}
