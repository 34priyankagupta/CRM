package com.crm.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.crm.entity.Customer;
import com.crm.entity.ImageKeeper;
import com.crm.service.CustomerService;

@RestController
@EnableWebMvc
@RequestMapping("/api")
public class CustomerRestController {

	@Autowired
	private CustomerService customerService;

	@GetMapping("/customers")
	public List<Customer> getCustomers() throws InterruptedException {
		Thread.sleep(2000);
		return customerService.getCustometers();
	}

	@GetMapping("/customers/{id}")
	public Customer getCustomer(@PathVariable int id) throws InterruptedException {
		Customer customer = customerService.getCustomer(id);
		if(customer==null) {
			throw new RuntimeException("Customer not found: "+id);
		}
		Thread.sleep(2000);
		return customerService.getCustomer(id);
	}

	@DeleteMapping("/customers/{id}")
	public Customer deleteCustomer(@PathVariable int id) throws InterruptedException {
		Customer customer = customerService.getCustomer(id);
		if (customer == null) {
			throw new RuntimeException("Customer not found: "+id);
		}
		customerService.deleteCustomer(id);
		Thread.sleep(2000);
		return customer;
	}

	@PostMapping("/customers")
	public Customer addCustomer(@RequestBody Customer theCustomer) throws InterruptedException {
		theCustomer.setId(0);
		customerService.saveCustomer(theCustomer);
		Thread.sleep(2000);
		return theCustomer;
	}

	@PutMapping("/customers")
	public Customer updatingCustomer(@RequestBody Customer theCustomer) throws InterruptedException {
		customerService.saveCustomer(theCustomer);
		Thread.sleep(2000);
		return theCustomer;
	}
	
	@PostMapping("/customers/image")
	public ImageKeeper imageKeeper(@RequestBody ImageKeeper theImageKeeper) {
		theImageKeeper.setId(0);
		customerService.saveImage(theImageKeeper);
		return theImageKeeper;
	}
	
	@GetMapping(value="/customers/image/{email}/", headers="Accept=*/*",  produces="application/json")
	public ImageKeeper getImage(@PathVariable String email) {
		System.out.println("email: "+email);
		ImageKeeper theImageKeeper = customerService.getImage(email.trim());		
		if (theImageKeeper == null) {
			throw new RuntimeException("Image not found for email: "+email);
		
		}
		System.out.println("in controller: "+theImageKeeper.getCustomerEmail());
		System.out.println("in controller: "+theImageKeeper.getImage());
		return theImageKeeper;
	}
}
