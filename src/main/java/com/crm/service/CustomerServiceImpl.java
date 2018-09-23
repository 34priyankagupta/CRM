package com.crm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.crm.dao.CustomerDao;
import com.crm.entity.Customer;
import com.crm.entity.ImageKeeper;
import com.crm.exceptionHandling.CustomerNotFoundException;

@Service
public class CustomerServiceImpl implements CustomerService {
	
	@Autowired
	private CustomerDao customerDao;

	@Transactional
	@Override
	public List<Customer> getCustometers() throws CustomerNotFoundException {
		return customerDao.getCustometers(); 
	}

	@Transactional
	@Override
	public Customer getCustomer(int id) throws CustomerNotFoundException {
		return customerDao.getCustomer(id);
	}

	@Transactional
	@Override
	public void deleteCustomer(int id) throws CustomerNotFoundException {
		customerDao.deleteCustomer(id);
	}

	@Transactional
	@Override
	public void saveCustomer(Customer theCustomer) throws CustomerNotFoundException {
		System.out.println("came in Service impl");
		customerDao.saveCustomer(theCustomer);
		
	}

	@Transactional
	@Override
	public void saveImage(ImageKeeper theImageKeeper) throws CustomerNotFoundException {
		customerDao.saveImage(theImageKeeper);
		
	}

	@Transactional
	@Override
	public ImageKeeper getImage(String email) throws CustomerNotFoundException {
		System.out.println("Inside getimage service, email"+email+"email");
		return customerDao.getImage(email);
	}
	
	

}
