import React from "react";

export default function Assignment4() {
  return (
    <div style={{ padding: "20px", backgroundColor:"black",color:"white"}}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Assignment 4</h1>

      {/* Question 1 */}
      <div style={{ 
        marginBottom: "100px",  // Increased margin to prevent overlap
        borderBottom: "1px solid #ccc", 
        paddingBottom: "30px" 
      }}>
        <h2>Question 1: CSS Animations</h2>
        <div style={{ 
          padding: "20px",
          backgroundColor: "black",
          borderRadius: "8px"
        }}>
          <style>
            {`
              .example1 {
                width: 100px;
                height: 100px;
                background-color: red;
                animation-name: example;
                animation-duration: 4s;
                position: relative;
                animation-delay: 2s;
                animation-iteration-count: infinite;
                animation-direction: alternate;
                margin-bottom: 20px;
              }

              .animation-div {
                display: flex;
                width: 100px;
                height: 50px;
                background-color: red;
                font-weight: bold;
                position: relative;
                animation: mymove 5s;
                animation-fill-mode: forwards;
                justify-content: center;
                align-items: center;
                border-radius: 5px;
                margin-bottom: 10px;
              }

              #div1 { animation-timing-function: linear; }
              #div2 { animation-timing-function: ease; }
              #div3 { animation-timing-function: ease-in; }
              #div4 { animation-timing-function: ease-out; }
              #div5 { animation-timing-function: ease-in-out; }

              .example2 {
                width: 100px;
                height: 100px;
                background: red;
                position: relative;
                animation-name: example3;
                animation-duration: 3s;
                animation-delay: 2s;
                animation-fill-mode: both;
                margin-top: 20px;
              }

              @keyframes mymove {
                from { left: 0px; }
                to { left: 300px; }
              }

              @keyframes example {
                0% { background-color: red; left: 0px; top: 0px; }
                25% { background-color: yellow; left: 20px; top: 0px; }
                50% { background-color: blue; left: 20px; top: 20px; }
                75% { background-color: green; left: 0px; top: 20px; }
                100% { background-color: red; left: 0px; top: 0px; }
              }

              @keyframes example3 {
                from { left: 0px; background-color: yellow; }
                to { left: 200px; background-color: blue; }
              }
            `}
          </style>
          <div className="example1"></div>
          <hr style={{ margin: "20px 0" }} />
          <div id="div1" className="animation-div">Linear</div>
          <div id="div2" className="animation-div">Ease</div>
          <div id="div3" className="animation-div">Ease-In</div>
          <div id="div4" className="animation-div">Ease-Out</div>
          <div id="div5" className="animation-div">Ease-In-Out</div>
          <hr style={{ margin: "20px 0" }} />
          <div className="example2"></div>
        </div>
      </div>

      {/* Question 2 */}
      <div style={{ marginBottom: "50px", borderBottom: "1px solid #ccc", paddingBottom: "30px" }}>
        <h2>Question 2: Circular Rotation Following a Square Path</h2>
        <div style={{ 
          padding: "20px",
          backgroundColor: "black",
          borderRadius: "8px",
          background: "#9a9a9a",
          minHeight: "500px",
          position: "relative"
        }}>
          <style>
            {`
              .circle-animation {
                height: 100px;
                width: 100px;
                background-color: blue;
                border-radius: 50%;
                position: absolute;
                animation: path 4s linear infinite;
              }

              @keyframes path {
                0% { top: 200px; left: 100px; }
                25% { top: 200px; left: 300px; }
                50% { top: 400px; left: 300px; }
                75% { top: 400px; left: 100px; }
                100% { top: 200px; left: 100px; }
              }
            `}
          </style>
          <div className="circle-animation"></div>
        </div>
      </div>

      {/* Question 3 */}
      <div style={{ marginBottom: "50px", borderBottom: "1px solid #ccc", paddingBottom: "30px" }}>
        <h2>Question 3: Rotated Set of Squares</h2>
        <div style={{ 
          padding: "20px",
          backgroundColor: "black",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "600px"
        }}>
          <style>
            {`
              .squares-container {
                position: relative;
                height: 500px;
                width: 500px;
              }

              .square {
                position: absolute;
                height: 300px;
                width: 300px;
                background-color: blue;
              }

              .square1 { transform: rotate(5deg); }
              .square2 { transform: rotate(0deg); }
              .square3 { transform: rotate(2.5deg); }
              .square4 { transform: rotate(330deg); }
              .square5 { transform: rotate(332.5deg); }
              .square6 { transform: rotate(335deg); }
              .square7 { transform: rotate(30deg); }
              .square8 { transform: rotate(32.5deg); }
              .square9 { transform: rotate(35deg); }
              .square10 { transform: rotate(37.5deg); }
            `}
          </style>

          <div className="squares-container">
            <div className="square square1"></div>
            <div className="square square2"></div>
            <div className="square square3"></div>
            <div className="square square4"></div>
            <div className="square square5"></div>
            <div className="square square6"></div>
            <div className="square square7"></div>
            <div className="square square8"></div>
            <div className="square square9"></div>
            <div className="square square10"></div>
          </div>
        </div>
      </div>

      {/* Question 4*/}
      <div style={{ marginBottom: "50px" }}>
        <h2>Question 4: Grid with CSS Styling</h2>
        <div style={{ 
          padding: "20px",
          backgroundColor: "black",  
          borderRadius: "8px",
          fontFamily: "Arial", 
        }}>
          <style>
            {`
              .grid-container {
                display: grid;
                grid-template-areas:
                  "header header header"
                  "menu menu menu"
                  "main main sidebar"
                  "article article sidebar"
                  "footer footer footer";
                grid-template-columns: 1fr 3fr;
                gap: 10px;
                background-color: black;
                padding: 5px;
              }

              .grid-container > div {
                padding: 10px;
                background-color: #9a9a9a;
              }

              .grid-header {
                grid-area: header;
                background-color: rgba(255,0,0,0.7) !important;
                text-align: center;
                font-size: 20px;
                font-weight: 700;
                color: white;
                padding-top: 25px;
                padding-bottom: 25px;
              }

              .grid-menu {
                grid-area: menu;
                background-color: rgba(0, 106, 255, 0.7) !important;
                list-style: none;
                color: white;
                font-size: 15px;
                font-weight: 600;
                margin: 0;
                padding: 10px;
              }

              .grid-menu li {
                display: inline-flex;
                padding: 0px 20px;
              }

              .grid-main {
                grid-area: main;
                background-color: rgba(0,255,0,0.7) !important;
                color: white;
              }

              .grid-article {
                grid-area: article;
                background-color: rgba(128,0,128,0.7) !important;
                color: white;
              }

              .grid-sidebar {
                grid-area: sidebar;
                background-color: orange !important;
                color: white;
                padding-right: 5px;
              }

              .grid-footer {
                grid-area: footer;
                background-color: rgba(1, 24, 35, 0.7) !important;
                color: white;
                text-align: center;
              }
            `}
          </style>

          <div className="grid-container">
            <div className="grid-header">Web Programming</div>
            <div className="grid-menu">
              <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
            <div className="grid-main">
              <h3>Main Section</h3>
              <p>This is the main content of the page.</p>
            </div>
            <div className="grid-article">
              <h3>Article</h3>
              <p>This is a standalone article related to the main page.</p>
            </div>
            <div className="grid-sidebar">
              <h3>Sidebar</h3>
              <p>This is the sidebar, containing related links or ads.</p>
            </div>
            <div className="grid-footer">
              <p>&copy; 2025 Your Company. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}