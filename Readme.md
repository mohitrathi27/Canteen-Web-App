# Frontend Instructions

## Client Side

### Pages to Create:

1. **Login Page:** 
   - Design a page where users can input their credentials to log in.
   - Ensure a smooth user experience with validation and error handling.

2. **Signup Page:**
   - Develop a signup form where new users can register for an account.
   - Implement validation to ensure the correctness of user input data.

3. **Home Page:**
   - Design a user-friendly interface displaying the list of items available in the canteen.
   - Allow users to navigate and view items effortlessly.

4. **Profile Page:**
   - Create a page where users can view their details.
   - Provide functionality to modify user information.

5. **Transaction Visibility:**
   - Implement a feature where users can view their transaction history.
   - Ensure clear visibility and easy navigation.

## Admin Side

### Pages to Create:

1. **Admin Login:**
   - Develop a login page specifically for admin access.
   - Implement authentication mechanisms for secure login.

2. **Admin Dashboard:**
   - Design a comprehensive dashboard displaying relevant information.
   - Include features like user management, transaction monitoring, etc.

3. **User Management:**
   - Provide a section in the dashboard to view all users registered.
   - Implement search and filter functionalities for easy access.

4. **Edit Canteen Items:**
   - Create a page allowing the admin to modify the list of items available in the canteen.
   - Include options for adding, editing, or removing items.

5. **Balance Adjustment:**
   - Develop a page where the admin can adjust user balances.
   - Provide fields to input user ID and balance adjustment amount.

6. **User Profile Popup:**
   - Implement a popup feature for user profiles accessible from the dashboard.
   - Allow admin to view and edit user details conveniently.

### Backend APIs:

- **Admin Login:**
  - Endpoint: `http://localhost:5000/api/admin/login`
  - Method: POST
  - Body: 
    ```json
    {
      "username": "ssgmce_admin",
      "password": "ssgmcecanteen"
    }
    ```

- **Increment Balance:**
  - Endpoint: `http://localhost:5000/api/admin/users/65db7b23e159cb71f7afb53b/increment-balance`
  - Method: PUT
  - Body: 
    ```json
    {
      "balance": 100
    }
    ```

- **Decrement Balance:**
  - Endpoint: `http://localhost:5000/api/admin/decrement-balance`
  - Method: PUT
  - Body:
    ```json
    {
      "userId": "65db7b23e159cb71f7afb53b",
      "amount": 50
    }
    ```

- **CRUD on Product in Canteen:**
  - Endpoint: `http://localhost:5000/api/admin/add_product`
  - Method: POST
  - Body:
    ```json
    {
      "name": "Bhel",
      "cost": 50
    }
    ```

- **Purchase Item:**
  - Endpoint: `http://localhost:5000/api/order/purchase`
  - Method: POST
  - Body:
    ```json
    {
      "userId": "65db7b23e159cb71f7afb53b",
      "itemId": "65dc03a3cf19ed8f3f81bae3"
    }
    ```
  
Make sure to integrate these APIs into the frontend for seamless functionality between the user interface and the backend services.
