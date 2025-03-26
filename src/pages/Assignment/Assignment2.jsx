import React from "react";
import coffeeImage from "../../assets/Coffee.jpg";
import backgroundGif from "../../assets/background.gif";
import character1Gif from "../../assets/character1.gif";
import character2Gif from "../../assets/character2.gif";
import character3Png from "../../assets/character3.png";

export default function Assignment2() {
  return (
    <div style={{ paddingTop: "50px" , backgroundColor: "black", color: "white"}}>
      {/* Page 1: Coffee Cafe */}
      <div style={{ marginBottom: "50px"}}>
        <h2>Question 1: Coffee Shop Website</h2>
        <header
          style={{
            backgroundColor: "burlywood",
            color: "white",
            padding: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Coffee Shop</h1>
          <nav>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
              }}
            >
              <li style={{ margin: "0 10px" }}>
                <a
                  href="#about"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  About
                </a>
              </li>
              <li style={{ margin: "0 10px" }}>
                <a
                  href="#menu"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Menu
                </a>
              </li>
              <li style={{ margin: "0 10px" }}>
                <a
                  href="#contact"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <div
          style={{
            textAlign: "center",
            padding: "50px 20px",
            backgroundImage: `url(${coffeeImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
          }}
        >
          <h2 style={{ fontSize: "2.5em", margin: 0, color: "white" }}>
            Welcome to our Cafe
          </h2>
        </div>
        <section
          id="about"
          style={{ padding: "30px 20px", textAlign: "center" }}
        >
          <h2>About Us</h2>
          <p>
            We believe in serving the finest coffee. Whether you're here to
            work, relax, or meet friends, we've got the perfect brew for you.
          </p>
        </section>
        <section
          id="menu"
          style={{
            padding: "30px 20px",
            textAlign: "center",
            backgroundColor: "burlywood",
          }}
        >
          <h2>Our Menu</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              { name: "Espresso", price: "Rs.350" },
              { name: "Latte", price: "Rs.250" },
              { name: "Cappuccino", price: "Rs.300" },
              { name: "Mocha", price: "Rs.320" },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  padding: "20px",
                  margin: "10px",
                  width: "250px",
                  textAlign: "center",
                  color: "black"
                }}
              >
                <h3>{item.name}</h3>
                <p>{item.price}</p>
              </div>
            ))}
          </div>
        </section>
        <section
          id="contact"
          style={{ padding: "30px 20px", textAlign: "center" }}
        >
          <h2>Contact Us</h2>
          <p>Have questions or need assistance? Reach out to us!</p>
          <p>Email: example@gmail.com</p>
          <p>Phone: +91 12345 67890</p>
        </section>
        <footer
          style={{
            backgroundColor: "burlywood",
            color: "white",
            textAlign: "center",
            padding: "20px",
            marginTop: "20px",
          }}
        >
          <p>&copy; 2025 Coffee Cafe. All rights reserved.</p> 
        </footer>
      </div>

      {/* Page 2: Pixel Animation */}
      <div style={{ marginBottom: "50px" }}>
        <h2> Question 2: Animation Scene</h2>
        <div
          style={{
            position: "relative",
            height: "100vh",
            background: "black",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: `url(${backgroundGif}) repeat`,
              backgroundSize: "cover",
            }}
          ></div>
          <div style={{ position: "absolute", left: "5%", bottom: "10%" }}>
            <img
              src={character1Gif}
              width="300px"
              height="300px"
              alt="Character 1"
            />
          </div>
          <div
            style={{
              position: "absolute",
              right: "5%",
              bottom: "5%",
              animation: "move 1s linear infinite",
            }}
          >
            <img
              src={character2Gif}
              width="300px"
              height="300px"
              alt="Character 2"
            />
          </div>
          <div style={{ position: "absolute", bottom: "47%", left: "15%" }}>
            <img src={character3Png} width="100px" alt="Character 3" />
          </div>
          <style>
            {`
              @keyframes move {
                0% { transform: translateX(0); }
                50% { transform: translateX(-5px); }
                100% { transform: translateX(0); }
              }
            `}
          </style>
        </div>
      </div>

      {/* Page 3: HTML Form */}
      <div>
        <h2>Question 3: HTML Forms</h2>
        <h1>Fill the Following Details</h1>
        <form action="action.html" method="post" id="info">
          <fieldset>
            <legend>Personal Information</legend>
            <label>Name: </label>
            <input type="text" />
            <br />
            <br />
            <label>Email:</label>
            <input type="email" />
            <br />
            <br />
            <label>Age: </label>
            <input type="number" />
            <br />
            <br />
            <label>Gender:</label>
            <br />
            <input type="radio" name="gender" /> Male
            <br />
            <input type="radio" name="gender" /> Female
            <br />
            <br />
            <label>Date of Birth: </label>
            <input type="date" />
            <br />
            <br />
            <label>Favorite Color: </label>
            <input type="color" />
            <br />
            <br />
          </fieldset>
          <fieldset>
            <legend>Additional Information</legend>
            <label>Website URL:</label>
            <input type="url" />
            <br />
            <br />
            <label>Comment:</label>
            <br />
            <textarea rows="4" cols="50"></textarea>
            <br />
            <br />
            <label>Upload File: </label>
            <input type="file" accept=".pdf,.docx" required />
            <br />
            <br />
            <label>Subscribe to Newsletter: </label>
            <input type="checkbox" />
            <br />
            <br />
            <label htmlFor="countries">Country: </label>
            <select name="countries" id="countries" form="info">
              <option value="India">India</option>
              <option value="China">China</option>
              <option value="USA">USA</option>
              <option value="Australia">Australia</option>
            </select>
          </fieldset>
          <br />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}