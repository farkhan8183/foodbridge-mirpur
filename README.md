# 🍽️ FoodBridge – Project Setup Guide

Welcome to the **FoodBridge** project! Follow the steps below to set up and run the application on your local machine.

---

## 🧩 Prerequisites

Ensure the following tools are installed on your system:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [XAMPP](https://www.apachefriends.org/index.html)

---

## 🚀 Getting Started

### 1. Clone the Repository

Open your terminal and run:

---

### 2. Move Project to XAMPP Directory

After cloning, move the project folder to your XAMPP `htdocs` directory:

```bash
# For Windows
C:\xampp\htdocs\foodbridge

# For macOS/Linux
/Applications/XAMPP/htdocs/foodbridge
```

---

### 3. Start XAMPP Services

- Launch the **XAMPP Control Panel**
- Start the following services:
  - ✅ Apache
  - ✅ MySQL

---

### 4. Import the Database (if applicable)

1. Open your browser and go to: [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
2. Click on **"New"**, create a database (e.g., `foodbridge`)
3. Import the `.sql` file (if provided) using the **Import** tab or manually create the DB

---

### 5. Set Up the Frontend

Navigate to the frontend directory and install dependencies:

```bash
cd foodbridge-mirpur/foodbridge-Frontend
npm install
npm run dev
```

> The frontend will now be running on: [http://localhost:5173](http://localhost:5173)  
> (or another port if Vite/React assigns one)

---

### 6. Access the Backend

If your backend is PHP-based and inside `foodbridge-Backend`, it should now be accessible at:

```
http://localhost/foodbridge/foodbridge-Backend
```

Ensure any backend files like `db.php` are configured correctly with:

```php
$host = "localhost";
$username = "root";
$password = "";
$database = "foodbridge";
```

---

## ✅ You're All Set!

You now have both the frontend and backend running locally. You're ready to develop, test, and contribute to the FoodBridge project!

---

## 💡 Tips

- Use `npm run dev` every time you start frontend development.
- Make sure Apache and MySQL are running before accessing the project.
- Avoid pushing directly to `main`; use feature branches for collaboration.

---

## 📬 Contact

For queries, support, or contributions:

- **Abdul Haadi** – [GitHub](https://github.com/abdulhaadi0303)
- **Farhan Ahmed** – [GitHub](https://github.com/farkhan8183)

---

Happy coding! 🚀
