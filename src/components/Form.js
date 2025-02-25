import React, { useState } from "react";
import axios from "axios";
import "../styles.css"; // Corrected import path

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    email: "",
    profilePic: null,
  });

  const [people, setPeople] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePic: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    data.append("email", formData.email);
    data.append("profilePic", formData.profilePic);

    try {
      await axios.post("http://localhost:5000/upload", data);
      fetchPeople();
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  const fetchPeople = async () => {
    try {
      const res = await axios.get("http://localhost:5000/people");
      setPeople(res.data);
    } catch (error) {
      console.error("Error fetching people", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>College ID Form</h2>
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="file" name="profilePic" onChange={handleFileChange} required />
        <button type="submit">Submit</button>
      </form>

      <div className="cards">
        {people.map((person, index) => (
          <div className="card" key={index}>
            <img src={person.profilePic} alt="Profile" />
            <h3>{person.firstName} {person.lastName}</h3>
            <p><strong>Phone:</strong> {person.phone}</p>
            <p><strong>Address:</strong> {person.address}</p>
            <p><strong>Email:</strong> {person.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
