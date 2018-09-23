package com.crm.service;

import java.util.List;

import com.crm.entity.Customer;
import com.crm.entity.ImageKeeper;
import com.crm.exceptionHandling.CustomerNotFoundException;

public interface CustomerService {
	public List<Customer> getCustometers() throws CustomerNotFoundException;

	public Customer getCustomer(int id) throws CustomerNotFoundException;

	public void deleteCustomer(int id) throws CustomerNotFoundException;

	public void saveCustomer(Customer theCustomer) throws CustomerNotFoundException;

	public void saveImage(ImageKeeper theImageKeeper) throws CustomerNotFoundException;

	public ImageKeeper getImage(String email) throws CustomerNotFoundException;
}
