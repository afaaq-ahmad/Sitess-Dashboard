// src/app/layout.js
import Navbar from "@/components/navbar";
import "../globals.css";
import Sidebar from "./Sidebar";

export const metadata = {
  title: "Injuries",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="video-background">
          <video autoPlay loop muted>
            <source src="/assets/snowfall-background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <Navbar />
        <div className="app-container">
          <div className="sidebarOuterContainer">
            <Sidebar />
          </div>
          <div className="content-container">{children}</div>
        </div>
      </body>
    </html>
  );
}
