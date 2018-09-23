package com.crm.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.crm.entity.Customer;
import com.crm.entity.ImageKeeper;

@Repository
public class CustomerDaoImpl implements CustomerDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	@Override
	public List<Customer> getCustometers() {
		Session currentSession = sessionFactory.getCurrentSession();
		Query<Customer> theQuery = currentSession.createQuery("from Customer ORDER BY id DESC",Customer.class);
		List<Customer> customers = theQuery.getResultList();
		return customers;
	}

	@Override
	public Customer getCustomer(int id) {
		Session currentSession = sessionFactory.getCurrentSession();
		Customer theCustomer = currentSession.get(Customer.class,id);
		return theCustomer;
	}

	@Override
	public void deleteCustomer(int theId) {
		Session currentSession= sessionFactory.getCurrentSession();
		Query theQuery = currentSession.createQuery("delete from Customer where id=:customerId");
		theQuery.setParameter("customerId", theId);
		theQuery.executeUpdate();
		
	}

	@Override
	public void saveCustomer(Customer theCustomer) {
		System.out.println("came in dao impl");
		Session currentSession = sessionFactory.getCurrentSession();
		currentSession.saveOrUpdate(theCustomer);
		
	}

	@Override
	public void saveImage(ImageKeeper theImageKeeper) {
		System.out.println("image data in string: "+ theImageKeeper.getImage().toString());
		System.out.println("image data: "+ theImageKeeper.getImage());
		Session currentSession = sessionFactory.getCurrentSession();
		currentSession.saveOrUpdate(theImageKeeper);
		
	}

	@Override
	public ImageKeeper getImage(String email) {
		Session currentSession = sessionFactory.getCurrentSession();
		Query<ImageKeeper> theQuery = currentSession.createQuery("from ImageKeeper where customerEmail=:thisEmail",ImageKeeper.class);
		theQuery.setParameter("thisEmail", email);
		System.out.println("size: "+theQuery.getFetchSize());
		System.out.println("total length: "+theQuery.getResultList().size());
		return theQuery.getResultList().get(0);
	}

	
}
