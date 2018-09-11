package com.crm.dao;

import java.util.List;

import com.crm.entity.Customer;

public interface CustomerDao {

	public List<Customer> getCustometers();

	public Customer getCustomer(int id);

	public void deleteCustomer(int id);

	public void saveCustomer(Customer theCustomer);
}
