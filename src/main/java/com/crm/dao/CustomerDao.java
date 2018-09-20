package com.crm.dao;

import java.util.List;

import com.crm.entity.Customer;
import com.crm.entity.ImageKeeper;

public interface CustomerDao {

	public List<Customer> getCustometers();

	public Customer getCustomer(int id);

	public void deleteCustomer(int id);

	public void saveCustomer(Customer theCustomer);

	public void saveImage(ImageKeeper theImageKeeper);
}
