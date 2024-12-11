```markdown
# Product Management System

## Overview
The **Product Management System** is a simple web application designed to manage products and their associated categories for a shop. It allows administrators to view, add, edit, and delete products while managing product categories. The system is built with Node.js and uses MongoDB for data storage, with Mongoose as an Object Data Modeling (ODM) library.

## Features

### Admin Features
- **View All Products**: Browse a list of products currently available in the shop, including details such as names, descriptions, prices, categories, and images.
- **Add New Product**: Add new products by providing information like the name, description, price, category, and image.
- **Edit Product**: Edit product details using a modal form to update the product name, description, price, category, and image.
- **Delete Product**: Remove products from the system with a confirmation prompt.
- **View Categories**: Manage and assign categories to products.

### System Scope
- User Authentication needed for managing products and categories. Guest users have the same previliges as logged in non-admin users
- Admin-only features for adding, editing, and deleting products.

## Technologies Used
- **Backend Language**: Node.js
- **Database Library**: Mongoose (for MongoDB)
- **Architecture**: MVC (Model-View-Controller)
- **Frontend**: 
  - Template Engine: EJS (Embedded JavaScript)
  - Rendering: Server-side

## Installation and Setup

### Prerequisites
- **Node.js**: Ensure that Node.js is installed on your system. [Download Node.js](https://nodejs.org/)
- **MongoDB**: Set up a local MongoDB server or use a cloud MongoDB service. [Download MongoDB](https://www.mongodb.com/try/download/community)

### Steps

1. **Clone the Repository**:
   ```bash
   git clone [https://github.com/AgyemangHenryDuah/Product_Management_System.git]
   cd product-management-system
   ```

2. **Install Dependencies**:
   Install all the required dependencies:
   ```bash
   npm install
   ```

3. **Set Up Database Connection**:
   - Open the `config/database.js` file and configure the connection to your MongoDB database. Example configuration:
     ```javascript
     const connectDB = async () => {
        try {
            await mongoose.connect(process.env.MONGODB_URI)
            } catch (error) {
                console.error("MongoDB connection error:", error)
                process.exit(1)
                }
        }
     ```

4. **Run the Application**:
   Run the app locally:
   ```bash
   npm run dev
   ```

5. **Access the Application**:
   - Open your browser and navigate to `http://localhost:${PORT}` to access the product management system.

---

## Usage

### Viewing Available Products
- Navigate to the homepage to see a list of all products available in the shop.

### Viewing Product Details
- Click on a product to view its detailed information, including its category, description, and price.

### Adding a Product
- To add a new product, click the "Add Product" button. Enter product details such as name, description, price, category, and image, and submit the form to add the product.

### Editing a Product
- To edit a product, click on the "Edit" button next to the product. This will open a modal with the product's details, which can be updated and saved.

### Deleting a Product
- To delete a product, click on the "Delete" button next to the product. A confirmation prompt will appear, and if confirmed, the product will be removed from the system.

---

## Contribution Guidelines
- Fork the repository.
- Create a feature branch for your changes.
- Commit changes with clear and descriptive messages.
- Open a pull request for review once your feature or fix is complete.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.
```

---