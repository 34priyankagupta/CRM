package com.crm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.crm.dao.CustomerDao;
import com.crm.entity.Customer;
import com.crm.entity.ImageKeeper;

@Service
public class CustomerServiceImpl implements CustomerService {
	
	@Autowired
	private CustomerDao customerDao;

	@Transactional
	@Override
	public List<Customer> getCustometers() {
		return customerDao.getCustometers(); 
	}

	@Transactional
	@Override
	public Customer getCustomer(int id) {
		return customerDao.getCustomer(id);
	}

	@Transactional
	@Override
	public void deleteCustomer(int id) {
		customerDao.deleteCustomer(id);
	}

	@Transactional
	@Override
	public void saveCustomer(Customer theCustomer) {
		customerDao.saveCustomer(theCustomer);
		
	}

	@Override
	public void saveImage(ImageKeeper theImageKeeper) {
		customerDao.saveImage(theImageKeeper);
		
	}
	
	

}
