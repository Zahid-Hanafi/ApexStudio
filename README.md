# ApexStudio - Studio Photo Reservation System

## 1. Project Description
ApexStudio is a responsive web application designed to streamline the reservation process for a professional photography studio. The system allows users to browse photography packages, check real-time availability, and manage their bookings through a personalized dashboard.

This project demonstrates advanced web design principles, including responsive layout, dynamic data visualization, and simulated content management, utilizing **Bootstrap 5** for the interface and **JavaScript (LocalStorage)** to simulate a functional backend database.

## 2. Features Included
* **Authentication System:** Secure Login and Registration pages with error handling and session management using LocalStorage.
* **User Dashboard:** A central hub displaying dynamic booking statistics (Total, Pending, Completed) and quick action links.
* **Data Visualization (Chart.js):**
    * **Bar Chart:** Visualizes peak booking slots throughout the year (Jan-Dec data).
    * **Pie Chart:** Displays the popularity distribution of different service packages.
* **Booking Management:** Allows users to add new reservations and cancel existing ones, synced with a master list.
* **Data Views:** Includes a master booking table view (`listbooking.html`) and a responsive services catalog grid (`listservices.html`).
* **Content Pages:** Dedicated About Us and Contact pages (`about.html`, `contact.html`).
* **Responsive Design:** Fully optimized for both desktop and mobile devices using Bootstrap 5 grid and utilities.
* **Enhanced Navigation & Usability (New):**
  	* **Scroll-to-Top Button:** A persistent arrow button that allows users to smoothly scroll back to the top of the page with a single click.
  	* **Logo Redirection:** The ApexStudio logo in the navigation bar is configured to redirect the user instantly to the Dashboard (dashboard.html) from any page, except login page(index.html) & register page (register.html).

## 3. Technologies & Frameworks Used
* **HTML5, CSS3, JavaScript:** Core programming languages.
* **Bootstrap 5:** Primary front-end framework for responsive layout and UI components.
* **Chart.js:** Library used for rendering dynamic data visualizations.
* **Font Awesome:** For scalable vector icons used across the interface.
* **LocalStorage API:** To simulate persistent database operations.

## 4. Instructions to Test (Login & Usage)
To ensure the system loads the full 30-item dataset and runs correctly, follow these steps:

**Step 1: Data Initialization**
1.  Open your website in **Google Chrome**.
2.  Press **F12** to open Developer Tools.
3.  Go to the **Console** tab.
4.  Type the following command exactly to clear old data and load the new 30-item dataset, then press **Enter**:
    ```javascript
    localStorage.removeItem('apex_bookings'); location.reload();
    ```

**Step 2: Registration**
1.  On the `index.html` (Login) page, click the **"Create an Account"** link.
2.  Register a new user (e.g., Username: `testuser`, Password: `1234`).
3.  Click **Register Now** and return to the Login page.

**Step 3: Login & Verification**
1.  Enter your new credentials (`testuser` / `1234`).
2.  On the **Dashboard**, verify the following:
    * **Total Bookings:** Displays **30** (or higher if you added more).
    * **Charts:** The Bar Chart shows data distributed across the 12 months.
	
## 5. File Structure
* `index.html` - Login Page
* `register.html` - Registration Page
* `dashboard.html` - Main User Dashboard (Charts & Stats)
* `listbooking.html` - Master Data View (Table)
* `mybooking.html` - User Booking Management & Calendar
* `listservices.html` - Service Packages (Grid View)
* `about.html` - Mission, Vision, Journey, & Testimonials
* `contact.html` - Location Map & Contact Info
* `style.css` - Custom CSS overrides
* `script.js` - Core logic application

---
**Student Name:** MUHAMMAD ZAHID HANAFI BIN MOHAMAD AZIAN
**Student ID:** 2025127713
**Student Name:** NUR ‘AAINII NABILAH BINTI MOHAMAD NASIR
**Student ID:** 2025119807
**Group:** CDIM2624A
**Course:** IMS566 - Advanced Web Design
