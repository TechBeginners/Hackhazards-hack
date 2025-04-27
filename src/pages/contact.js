import React, { useState } from "react";
import "./contact.css";

function contact() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    message: "",
    terms: false,
    privacy: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Yahan API call ya success message dikhaya ja sakta hai
  };

  return (
    <div className="container">
      <h1>Contact us</h1>
      <p>Get in touch with us using the form below.</p>
      <form onSubmit={handleSubmit}>
        <div className="grid-container">
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Surname</label>
            <input
              type="text"
              name="surname"
              placeholder="Enter your surname"
              required
              value={formData.surname}
              onChange={handleChange}
            />
          </div>
        </div>

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <label>Number</label>
        <div className="phone-container">
          <select>
            <option>GE (+955)</option>
          </select>
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <label>Message</label>
        <textarea
          name="message"
          placeholder="Type your message here..."
          rows="5"
          required
          value={formData.message}
          onChange={handleChange}
        ></textarea>

        <div className="checkbox-container">
          <input
            type="checkbox"
            name="terms"
            required
            checked={formData.terms}
            onChange={handleChange}
          />
          <span>By clicking, you agree with our Terms & Conditions</span>
        </div>

        <div className="checkbox-container">
          <input
            type="checkbox"
            name="privacy"
            required
            checked={formData.privacy}
            onChange={handleChange}
          />
          <span>I have read and agree to the Privacy Policy</span>
        </div>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default contact;