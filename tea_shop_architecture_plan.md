# Architectural Design Plan: Tea Shop Order & Inventory Management System

## 1. Executive Summary
This document outlines the architectural design for a browser-based self-service ordering and inventory management application tailored for a multi-branch tea shop. The system aims to eliminate revenue leakage, track inventory via recipe-based deduction, and seamlessly handle both cash and UPI payments without requiring customers to download a native app.

---

## 2. System Core Components

### 2.1. Customer Web Application (Frontend)
*   **Access Mechanism:** Customers scan a table-specific or store-specific QR code. The QR code contains a URL with the branch ID (e.g., `https://app.yourteashop.com/order?branch=krmangalam`).
*   **User Interface:** A mobile-optimized Progressive Web App (PWA) accessed via the smartphone browser.
*   **Features:** Menu browsing, cart management, and payment selection (Cash or UPI).

### 2.2. Staff Portal / Point of Sale (Frontend)
*   **Access:** Tablet or smartphone used by the 2 employees behind the counter.
*   **Features:** 
    *   Real-time order queue (Live updates).
    *   Cash collection confirmation (acknowledging receipt of cash before handing over the tea).
    *   Order fulfillment tracking.

### 2.3. Admin Dashboard (Frontend)
*   **Access:** Desktop/Web app for the business owner.
*   **Features:** 
    *   Multi-branch overview and revenue reports.
    *   End-of-day (EOD) cash reconciliation (Expected Cash vs. Actual Cash).
    *   Inventory management (defining raw materials used per cup of tea).
    *   Employee management and access control.

### 2.4. Backend API System (Server)
*   **Role:** The central brain of the system.
*   **Features:** Multi-tenant architecture to isolate data between branches, securely handling order routing, calculating inventory deduction, and processing payment webhooks.

---

## 3. Recommended Technology Stack

| Layer | Recommended Technology | Justification |
| :--- | :--- | :--- |
| **Frontend (Customer/Staff)** | Next.js (React) + TailwindCSS | Fast rendering, SEO friendly, excellent for building mobile-responsive web apps. |
| **Backend API** | Node.js (Express) or Python (FastAPI) | Highly scalable, excellent for handling concurrent I/O requests (like real-time order updates). |
| **Database** | PostgreSQL | Relational database is crucial for ACID compliance (ensuring financial transactions and inventory counts are perfectly accurate). |
| **Real-time Updates** | WebSockets (Socket.io) or Supabase | Necessary for instantly notifying staff when a customer places an order from their phone. |
| **Payments** | Razorpay / PhonePe Payment Gateway | Seamless UPI intent integration (automatically opening GPay/PhonePe on the user's phone). |
| **Hosting infrastructure** | AWS or Vercel + Render | Vercel for frontend speed, AWS/Render for backend stability. |

---

## 4. Key Workflows & Data Flow

### 4.1. The Ordering & Payment Workflow
1.  **Scan & Browse:** Customer scans QR. Browser opens to the menu. Branch ID is automatically registered.
2.  **Checkout & Payment Selection:**
    *   **If UPI:** Customer selects UPI. An intent link is generated triggering their installed UPI apps. Once paid, the Payment Gateway sends a Webhook to the Backend. The order status updates to `Paid & Queued`.
    *   **If Cash:** Customer selects Cash. The order status is set to `Pending Cash`. 
3.  **Fulfillment:**
    *   Staff sees the order on their screen.
    *   If `Pending Cash`, the staff takes the money, clicks "Cash Received" on their screen, and the order shifts to `Paid & Queued`.
    *   Tea is prepared and handed to the customer. Staff marks order as `Completed`.

### 4.2. Inventory Deduction (Recipe-Based)
To solve the inventory tracking issue, the system will use **Bill of Materials (BOM) / Recipe linking**.
*   **Setup:** In the Admin Dashboard, define a recipe. (e.g., *1 Masala Tea = 10g tea powder + 50ml milk + 10g sugar + 1 cup*).
*   **Trigger:** The moment an order shifts to `Completed`, the backend automatically runs a transaction to deduct those exact raw material quantities from that specific branch's inventory database.
*   **Alerts:** When milk or cups drop below a defined threshold, the Admin Dashboard flags a "Restock Required" alert.

### 4.3. End of Day (EOD) Reconciliation
*   The system maintains a running total of all orders marked as "Cash Received" by employees.
*   At closing time, the system generates an EOD report: *"Expected Cash in Drawer: ₹4,500"*. 
*   This removes dependency on employees tracking cash manually and prevents "forgotten" orders.

---

## 5. Multi-Branch Architecture Considerations

To ensure the app scales as you open more locations, the database architecture must be **Multi-Tenant**.

*   **Global Database Tables:** `Users`, `Global_Menu_Items`.
*   **Branch-Specific Data:** Every operational table (`Orders`, `Inventory_Stock`, `Employees`, `Transactions`) must include a `branch_id` foreign key.
*   **Location-based Pricing:** The database design should allow a base price for a tea, but an optional override price linked to a `branch_id` (e.g., tea might cost more in a premium tech-park location).
*   **Role-Based Access Control (RBAC):** 
    *   *Super Admin (You):* Can see all branches.
    *   *Branch Manager:* Can only see reports and inventory for their assigned `branch_id`.
    *   *Employee:* Can only view the live order queue for their currently clocked-in branch.

---

## 6. Implementation Roadmap

*   **Phase 1: Core MVP (Weeks 1-4)**
    *   Setup database schema and cloud infrastructure.
    *   Build Customer Web App (Menu, Cart, Checkout).
    *   Integrate UPI Deep-linking for mobile browsers.
    *   Build Staff Order Queue screen (Cash acknowledgment feature).
*   **Phase 2: Inventory & Multi-Branch (Weeks 5-8)**
    *   Develop Recipe-based inventory deduction logic.
    *   Build Admin Dashboard for EOD reports and multi-branch revenue tracking.
*   **Phase 3: Refinement (Weeks 9-10)**
    *   Add low-stock alerts.
    *   Add analytics (Best selling hours, most popular items).
