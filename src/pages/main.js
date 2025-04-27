import React from 'react';
import './main.css'; // We'll keep your <style> part inside App.css separately

function main() {
  return (
    <div>
      {/* Utility Bar */}
      <div className="utility-bar">
        <div className="utility-links">
          <a href="login1.html">Login</a>
          <a href="#">Register</a>
          <a href="#">Support</a>
        </div>
      </div>

      {/* Header */}
      <header>
        <div className="nav-links">
          <a href="index.html">Home</a>

          {/* Popup Categories Button */}
          <input type="checkbox" id="toggleMiniScreen" />
          <label htmlFor="toggleMiniScreen" className="categories-btn">Categories</label>

          <a href="sentiments.html">Sentiments</a>
          <a href="summaries.html">Summaries</a>
          <a href="contactus.html">Contact Us</a>

          {/* Mini popup panel */}
          <div className="mini-screen">
            <ul>
              <li><a href="business.html">Business</a></li>
              <li><a href="health.html">Health</a></li>
              <li><a href="sports.html">Sports</a></li>
              <li><a href="politics.html">Politics</a></li>
              <li><a href="technology.html">Technology</a></li>
              <li><a href="education.html">Education</a></li>
              <li><a href="national.html">National</a></li>
              <li><a href="international.html">International</a></li>
              <li><a href="lawandcrime.html">Law And Crime</a></li>
              <li><a href="entertainment.html">Entertainment</a></li>
              <li><a href="finance.html">Finance</a></li>
              <li><a href="artificialintelligence.html">Artificial Intelligence</a></li>
            </ul>
          </div>
        </div>
      </header>

      {/* Trending News */}
      <div>
        <h2>Trending News</h2>
        <img 
          src="https://media-d.global.abb/is/image/abbc/abb%20-%20group%20headquarters%20zurich%20-%20cityport%20entrance:3x1?wid=1440&hei=480" 
          alt="Trending Image" 
          style={{ width: '100%', maxHeight: '480px', objectFit: 'cover' }} 
        />
      </div>

      {/* Follow Us Section */}
      <div>
        <h1>Follow Us</h1>
        <p>Connect with us for more on how BRIEFMINDS is enabling a more sustainable and<br />resource-efficient future.</p>
      </div>

      {/* Logos */}
      <div className="logo-container">
        <a href="index.html">
          <img src="https://static-00.iconduck.com/assets.00/youtube-with-circle-icon-1024x1024-b2h0vq6m.png" alt="YouTube" className="logo" />
        </a>
        <a href="SignIn.html">
          <img src="https://cdn-icons-png.flaticon.com/512/44/44646.png" alt="Facebook" className="logo" />
        </a>
        <a href="index.html">
          <img src="https://logodix.com/logo/1312390.png" alt="Twitter" className="logo" />
        </a>
        <a href="SignIn.html">
          <img src="https://static-00.iconduck.com/assets.00/linkedin-with-circle-icon-512x512-cvyrro5n.png" alt="LinkedIn" className="logo" />
        </a>
        <a href="SignIn.html">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnPwc1Y2yL-7bfOJjy6yG3mIKVr7PZB6w8EjoduQ58c8__7L0Ts_F5HDMHECRvZNte5Xw&usqp=CAU" alt="Instagram" className="logo" />
        </a>
      </div>

      {/* Footer */}
      <footer>
        <div>
          <p>&copy; 2025 Your Company Name. All rights reserved. Contact us: 
            <a href="mailto:contact@briefminds.com"> contact@briefminds.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default main;