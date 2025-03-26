import React, { useState } from "react";
import QRCode from "../../assets/QRCode.png";

export default function Assignment3() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div style={{ padding: "20px", backgroundColor:"black",color:"white" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Assignment 3</h1>

      {/* Question 1 */}
      <div style={{ marginBottom: "50px", borderBottom: "1px solid #ccc", paddingBottom: "30px" }}>
        <h2>Question 1: Vertical Flex Boxes</h2>
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          margin: "10px" 
        }}>
          <div style={{ 
            width: "100px", 
            height: "100px", 
            backgroundColor: "red", 
            margin: "10px" 
          }}></div>
          <div style={{ 
            width: "100px", 
            height: "100px", 
            backgroundColor: "red", 
            margin: "10px" 
          }}></div>
        </div>
      </div>

      {/* Question 2 */}
      <div style={{ marginBottom: "50px", borderBottom: "1px solid #ccc", paddingBottom: "30px" }}>
        <h2>Question 2: Horizontal Flex Boxes</h2>
        <div style={{ 
          display: "flex", 
          flexDirection: "row", 
          margin: "10px" 
        }}>
          <div style={{ 
            width: "100px", 
            height: "100px", 
            backgroundColor: "red", 
            margin: "10px" 
          }}></div>
          <div style={{ 
            width: "100px", 
            height: "100px", 
            backgroundColor: "red", 
            margin: "10px" 
          }}></div>
        </div>
      </div>

      {/* Question 3 */}
      <div style={{ marginBottom: "50px", borderBottom: "1px solid #ccc", paddingBottom: "30px" }}>
        <h2>Question 3: Login Form</h2>
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          height: "400px", 
          backgroundColor: "pink", 
          fontFamily: "Arial, Helvetica, sans-serif" 
        }}>
          <div style={{ 
            backgroundColor: "white", 
            padding: "20px 40px", 
            borderRadius: "10px", 
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)", 
            textAlign: "center", 
            width: "300px" ,
            color:"black"
          }}>
            <h2 style={{ marginBottom: "20px" }}>Login</h2>
            <form>
              <label style={{ 
                display: "block", 
                textAlign: "left", 
                margin: "10px 0 5px", 
                fontWeight: "bold" 
              }}>Username</label>
              <input style={{  
                width: "100%",  
                padding: "10px",  
                marginBottom: "15px",  
                border: "1px solid #ccc",  
                borderRadius: "5px"  
              }} type="text" placeholder="Enter your username" />

              <label style={{ 
                display: "block", 
                textAlign: "left", 
                margin: "10px 0 5px", 
                fontWeight: "bold" 
              }}>Password</label>
              <input style={{  
                width: "100%",  
                padding: "10px",  
                marginBottom: "15px",  
                border: "1px solid #ccc",  
                borderRadius: "5px"  
              }} type="password" placeholder="Enter your password" />
              
              <button style={{  
                width: "100%",  
                padding: "10px",  
                backgroundColor: "#24a0ed",  
                color: "white",  
                border: "none",  
                borderRadius: "5px",  
                fontSize: "16px" 
              }} type="submit">Login</button>
              
              <a style={{ 
                display: "block", 
                marginTop: "10px", 
                color: "#007bff" 
              }}>Forgot Password?</a>
            </form>
          </div>
        </div>
      </div>

      {/* Question 4 - Fixed dropdown functionality */}
      <div style={{ marginBottom: "50px", borderBottom: "1px solid #ccc", paddingBottom: "30px" }}>
        <h2>Question 4: Navigation Bar with Dropdown</h2>
        <div style={{ 
          backgroundColor: "#333", 
          overflow: "hidden" 
        }}>
          <a style={{ 
            float: "left", 
            display: "block", 
            color: "white", 
            textAlign: "center", 
            padding: "14px 16px", 
            textDecoration: "none" 
          }}>Home</a>
          
          <div style={{ 
            float: "left", 
            overflow: "hidden" 
          }}
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
          >
            <button style={{ 
              cursor: "pointer", 
              fontSize: "16px", 
              border: "none", 
              outline: "none", 
              color: "white", 
              padding: "14px 16px", 
              backgroundColor: "inherit", 
              fontFamily: "inherit", 
              margin: "0" 
            }}>Services</button>
            
            <div style={{  
              display: showDropdown ? "block" : "none",  
              position: "absolute",  
              backgroundColor: "#444",  
              minWidth: "160px",  
              boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",  
              zIndex: "1"  
            }}>
              <a style={{  
                float: "none",  
                color: "white",  
                padding: "12px 16px",  
                textDecoration: "none",  
                display: "block",  
                textAlign: "left"  
              }}>Web Design</a>
              <a style={{  
                float: "none",  
                color: "white",  
                padding: "12px 16px",  
                textDecoration: "none",  
                display: "block",  
                textAlign: "left"  
              }}>SEO</a>
              <a style={{  
                float: "none",  
                color: "white",  
                padding: "12px 16px",  
                textDecoration: "none",  
                display: "block",  
                textAlign: "left"  
              }}>Marketing</a>
            </div>
          </div>
          
          <a style={{ 
            float: "left", 
            display: "block", 
            color: "white", 
            textAlign: "center", 
            padding: "14px 16px", 
            textDecoration: "none" 
          }}>About</a>
          
          <a style={{ 
            float: "left", 
            display: "block", 
            color: "white", 
            textAlign: "center", 
            padding: "14px 16px", 
            textDecoration: "none" 
          }}>Contact</a>
        </div>
      </div>

      {/* Question 5 - Added hover effects */}
      <div style={{ marginBottom: "50px", borderBottom: "1px solid #ccc", paddingBottom: "30px" }}>
        <h2>Question 5: Sidebar Menu</h2>
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          minHeight: "300px", 
          backgroundColor: "rgb(194, 193, 193)" 
        }}>
          <div style={{ 
            width: "200px", 
            borderRadius: "8px", 
            overflow: "hidden", 
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)", 
            backgroundColor: "white" 
          }}>
            <div style={{ 
              backgroundColor: "#00bcd4", 
              color: "white", 
              textAlign: "center", 
              padding: "15px 0", 
              fontSize: "16px", 
              fontWeight: "bold" 
            }}>Home</div>
            
            <ul style={{ 
              listStyle: "none", 
              padding: "0", 
              margin: "0", 
              fontSize: "16px" 
            }}>
              <li style={{ 
                padding: "12px 20px",  
                borderBottom: "1px solid #444",  
                color: "white",  
                backgroundColor: "#383838",  
                cursor: "pointer",
                transition: "background-color 0.3s",
                ":hover": {
                  backgroundColor: "#444"
                }
              }}>Services</li>
              <li style={{ 
                padding: "12px 20px",  
                borderBottom: "1px solid #444",  
                color: "white",  
                backgroundColor: "#383838",  
                cursor: "pointer",
                transition: "background-color 0.3s",
                ":hover": {
                  backgroundColor: "#444"
                }
              }}>About</li>
              <li style={{ 
                padding: "12px 20px",  
                borderBottom: "1px solid #444",  
                color: "white",  
                backgroundColor: "#383838",  
                cursor: "pointer",
                transition: "background-color 0.3s",
                ":hover": {
                  backgroundColor: "#444"
                }
              }}>Portfolio</li>
              <li style={{ 
                padding: "12px 20px",  
                borderBottom: "1px solid #444",  
                color: "white",  
                backgroundColor: "#383838",  
                cursor: "pointer",
                transition: "background-color 0.3s",
                ":hover": {
                  backgroundColor: "#444"
                }
              }}>Contact</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Question 6 - Added QR Code */}
      <div style={{ marginBottom: "50px" }}>
        <h2>Question 6: Projector Screen</h2>
        <div style={{ 
          position: "relative", 
          width: "100%", 
          height: "400px", 
          backgroundColor: "#444", 
          fontFamily: "Arial, sans-serif", 
          color: "white" 
        }}>
          <div style={{ 
            fontSize: "3rem", 
            fontWeight: "bold", 
            opacity: "0.8", 
            textTransform: "uppercase", 
            position: "absolute", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)", 
            fontStyle: "italic" 
          }}>Acer</div>
          
          <div style={{ 
            position: "absolute", 
            bottom: "15px", 
            left: "15px", 
            display: "flex", 
            alignItems: "center", 
            gap: "15px", 
            opacity: "0.7" 
          }}>
            <div style={{ 
              width: "80px", 
              height: "80px", 
              backgroundColor: "white", 
              border: "1px solid #999",
              backgroundImage: `url(${QRCode})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}></div>
            
            <div> 
              XT223H<br /> 
              Projector Information 
            </div> 
          </div> 
          
          <div style={{ 
            position: "absolute", 
            bottom: "15px", 
            right: "15px", 
            textAlign: "right", 
            fontSize: "1rem", 
            opacity: "0.7" 
          }}> 
            No Signal<br /> 
            VGA IN 
          </div> 
        </div>
      </div>
    </div>
  );
}