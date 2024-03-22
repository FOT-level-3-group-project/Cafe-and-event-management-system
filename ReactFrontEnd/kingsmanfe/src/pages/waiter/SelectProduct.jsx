import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SelectProduct() {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [total, setTotal] = useState('');

  useEffect(() => {
    fetchFoodItems();
     

  }, []);
 
  
  const fetchFoodItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/food/categories');
      setFoodItems(response.data);
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };

  const fetchFoodNamesByCategory = async () => {
    if (selectedCategory) {
      try {
        const response = await axios.get(`http://localhost:8080/api/food/${selectedCategory}`);
        setFoodItems(response.data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    fetchFoodNamesByCategory(category);
  };

  const handleProductChange = (e) => {
    const productName = e.target.value;
    setSelectedProduct(productName);
    const selectedFoodItem = foodItems.find(item => item.foodName === productName);
    if (selectedFoodItem) {
      setSelectedPrice(selectedFoodItem.foodPrice);
    } else {
      setSelectedPrice('');
    }
  };

  const handleQuantityChange = (e) => {
    const quantityValue = e.target.value;
    setQuantity(quantityValue);
    if (selectedPrice && quantityValue) {
      setTotal(selectedPrice * quantityValue);
    } else {
      setTotal('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission as needed
  };

  return (
    <div className="container">
      <div className="row">
        <form className="row g-3 shadow" onSubmit={handleSubmit}>
          <h2 className='text-center m-4'>Select Product</h2>
          <div className="col-md-4">
            <label htmlFor="foodCategory" className="form-label">Category</label>
            <select className="form-select" name="foodCategory" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Select Category</option>
              {foodItems.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="foodName" className="form-label">Product</label>
            <select className="form-select" name="foodName" value={selectedProduct} onChange={handleProductChange}>
              <option value="">Select Product</option>
              {foodItems.map(item => (
                <option key={item.foodId} value={item.foodName}>{item.foodName}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="foodPrice" className="form-label">Price</label>
            <input type="text" className="form-control" name="foodPrice" value={selectedPrice} readOnly />
          </div>
          <div className="col-md-4">
            <label htmlFor="quantity" className="form-label">Quantity</label>
            <input type="text" className="form-control" name="quantity" value={quantity} onChange={handleQuantityChange}/>
          </div>
          <div className="col-md-4">
            <label htmlFor="total" className="form-label">Total</label>
            <input type="text" className="form-control" name="total" value={total} readOnly/>
          </div>
          <div className="col-md-4 offset-md-8">
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SelectProduct;
