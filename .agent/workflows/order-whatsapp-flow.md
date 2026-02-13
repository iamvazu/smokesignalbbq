---
description: Implement robust Order-to-WhatsApp workflow with Database persistence
---

To implement the "Save to DB then WhatsApp" flow correctly across the application and avoid 500 errors:

### 1. Backend Controller Logic (`orderController.ts`)
- **UUID Validation**: Use a helper `isUUID()` to check if passed `productId` or `comboId` are valid UUIDs.
- **FK Safety**: If an ID is NOT a UUID (likely a legacy hardcoded ID), set `productId`/`comboId` to `null` to avoid Prisma Foreign Key constraint crashes.
- **Type Casting**: Wrap all numerical values (`totalAmount`, `price`, `quantity`, etc.) in `Math.round(Number())` to prevent Prisma Int vs Float errors.
- **Atomic Operations**: Ensure the customer, address, and order are created in a transaction or a logical sequence.

### 2. Frontend State Management (`store.ts`)
- **Category Awareness**: Ensure `CartItem` includes a `category` field so the Checkout logic knows whether to populate `productId` or `comboId`.
- **Price Reliability**: Ensure `priceValue` is always stored as a number in the store.

### 3. Frontend Checkout Component (`ShoppingCart.tsx` or similar)
- **Data Mapping**: In the `handleCheckout` function, map cart items to the backend `OrderItem` structure based on their category.
- **Sequence**:
  1.  **Validate**: Check if delivery details are complete.
  2.  **Persist**: Call `axios.post('/orders', orderData)`. 
  3.  **Handle Success**: Use the response (which contains the generated DB `id`) to format the WhatsApp message with a real Order ID (e.g., `#ASH8F2`).
  4.  **WhatsApp Redirect**: Open the `wa.me` link with the `encodeURIComponent` message.
  5.  **UX**: Show a loading spinner during the individual DB write phase.
  6.  **Cleanup**: Clear the cart only after a successful redirect.

### 4. Database Sync (CRITICAL)
- **Schema Drift**: If new columns (like `isMostPopular` in `ComboPack`) were added, the user MUST run `npx prisma db push` or `npx prisma migrate dev`. 500 errors often stem from the Prisma Client expecting columns that don't exist in the actual DB yet.

### 5. Deployment / Verification 
- **Tail Logs**: If errors persist, check the backend console for the "Unhandled error" stack trace.
- **CORS**: Ensure the frontend's `VITE_API_URL` correctly matches the backend's allowed origins.
