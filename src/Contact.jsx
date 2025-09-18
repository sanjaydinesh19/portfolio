import "./Contact.css";
import githubIcon from "./assets/github.png";
import linkedInIcon from "./assets/linkedin.png";
import Navbar from "./components/Navbar/Navbar";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

function Contact() {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState(""); // 👈 for success/error

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_awp38ey",     // Service ID
        "template_l0ev4je",    // Template ID
        form.current,
        "hmcigYOwDaLIth2hE"    // Public Key
      )
      .then(
        (result) => {
          setStatusMessage("✅ Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          setStatusMessage("❌ Oops, something went wrong. Please try again.");
        }
      );
  };

  return (
    <>
      <Navbar />
      <div className="contact-container">
        {/* Left side */}
        <div className="contact-container-left">
          <div className="contact-heading">Get in Touch</div>
          <p className="contact-message">
            Feel free to reach out to me via email or through my social media profiles.
          </p>
          <div className="contact-info">
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:sanjaydinesh1905@gmail.com">
                sanjaydinesh1905@gmail.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong> +91 9884890919
            </p>
          </div>
          <div className="contact-social-icons">
            <a
              href="https://github.com/sanjaydinesh19"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-link"
            >
              <img className="contact-social-icon" src={githubIcon} alt="github icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/sanjay-dinesh-a0a7b7288/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-link"
            >
              <img className="contact-social-icon" src={linkedInIcon} alt="linkedIn icon" />
            </a>
          </div>
        </div>

        {/* Right side */}
        <div className="contact-container-right">
          <div className="contact-form">
            <h2>Send Me a Message</h2>
            <form ref={form} onSubmit={sendEmail}>
              <label>Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="Your Name"
                className="contact-input-field"
                required
              />

              <label>Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="Your Email"
                className="contact-input-field"
                required
              />

              <label>Message</label>
              <textarea
                name="message"
                placeholder="Your Message"
                className="contact-textarea-field"
                rows="4"
                required
              ></textarea>

              <button type="submit" className="contact-submit-button">
                Send
              </button>
            </form>

            {/* ✅ Inline status message */}
            {statusMessage && (
              <p className="contact-status-message">{statusMessage}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
