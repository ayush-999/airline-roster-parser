**For Assignment Testing:**

1. **Run your Laravel application:** Make sure Laravel development server is running. start it with the command php artisan serve in project's root directory. I'll use http://localhost:8000 as the base URL in the examples below. Adjust if your setup is different.

2. **Postman:** Have Postman installed and open.

**Calling the Endpoints:**

Here are the settings for each endpoint in Postman:

1. **Upload Roster File**
   
   * **Method:** POST
   
   * **URL:** http://localhost:8000/api/roster/upload
   
   * **Headers:**
     
     * Accept: application/json (Tells Laravel you expect a JSON response)
   
   * **Body:**
     
     * Select the form-data option.
     
     * In the key-value table:
       
       * Enter roster in the KEY column.
       
       * **Important:** Hover over the KEY field (roster) and a dropdown will appear on the right saying Text. Change this dropdown to File.
       
       * In the VALUE column, click "Select Files" and choose the roster file (e.g., your\_roster.pdf, your\_roster.txt, your\_roster.xlsx) you want to upload.
   
   * **Action:** Click "Send". we get a 201 Created status with a JSON body like {"message": "Roster processed successfully", "events\_processed": 5} if successful, or an error response (e.g., 422 Unprocessable Entity for validation errors, 500 Internal Server Error if parsing fails badly).

2. **Get Events Between Dates**
   
   * **Method:** GET
   
   * **URL:** http://localhost:8000/api/events
   
   * **Headers:**
     
     * Accept: application/json
   
   * **Params (Query Parameters):** Go to the "Params" tab below the URL bar.
     
     * Add a key start\_date with a value like 2022-01-10.
     
     * Add a key end\_date with a value like 2022-01-20.
     
     * _(Postman automatically appends these to the URL like: http://localhost:8000/api/events?start\_date=2022-01-10&end\_date=2022-01-20)_
   
   * **Action:** Click "Send". we get a 200 OK status with a JSON array of event objects matching the date range.

3. **Get Flights for Next Week (from 2022-01-14)**
   
   * **Method:** GET
   
   * **URL:** http://localhost:8000/api/flights/next-week
   
   * **Headers:**
     
     * Accept: application/json
   
   * **Params:** None needed.
   
   * **Action:** Click "Send". we get a 200 OK status with a JSON array of flight objects (including their related event data) scheduled between Jan 14, 2022 and Jan 21, 2022.

4. **Get Standby Events for Next Week (from 2022-01-14)**
   
   * **Method:** GET
   
   * **URL:** http://localhost:8000/api/standby/next-week
   
   * **Headers:**
     
     * Accept: application/json
   
   * **Params:** None needed.
   
   * **Action:** Click "Send". we get a 200 OK status with a JSON array of standby objects (including their related event data) scheduled between Jan 14, 2022 and Jan 21, 2022.

5. **Get Flights From a Specific Location**
   
   * **Method:** GET
   
   * **URL:** http://localhost:8000/api/flights/from/JFK
     
     * _(Replace JFK in the URL with the actual departure airport code you want to query, e.g., LAX, AMS)_
   
   * **Headers:**
     
     * Accept: application/json
   
   * **Params:** None needed in the query string (the location is part of the URL path).
   
   * **Action:** Click "Send". we get a 200 OK status with a JSON array of flight objects departing from the specified location.

---
