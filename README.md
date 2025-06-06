# Version History 05/06/2025 [Caetan DS]

## Database Functionality Added (For the login system - will integrate the water demand later)

* To set up the database use the [schema.sql](schema.sql) file inside of your pgadmin **you may need to enable VPN if off campus** (should be able to drag it in but you may have to open query tool then paste it in)

* The required packages *should* install when you run the program but to be sure run ```npm install express pg express-session dotenv``` in your terminal in vscode (cmd/ctrl + shift + p type: "create new terminal")to install the new required packages

* Next up as we all have different database usernames and passwords I've set up a .environment you need to do the following:

* 1. Create a file ".env" in your root folder (mainProject) as shown here (gitignore is used later)
     ![Screenshot 2025-06-06 at 02 55 32](https://github.com/user-attachments/assets/bdf1551f-5d39-4dca-b844-89aa2cbdfdee)


* 2. Add the following to that file: 
    ```
    PGUSER=your_db_username
    PGHOST=cmpstudb-01.cmp.uea.ac.uk
    PGDATABASE=your_db_name
    PGPASSWORD=your_db_password
    PGPORT=5432
    ```
* 3. Add that file to gitignore:
    * In VScode: cmd/ctrl + shift + p type: "create new terminal" Enter
    * "code .gitignore"
    * in the file that pops up, ".gitignore", add ".env" to it - this means that we won't be sharing our personal passwords between each other but should all have a baseline level of access to simulate the website
          *we could make this more of a live database where all of us can access it but that's more work and probably not required for the end solution- let me know, I could try*

## Login System

* The login system is really basic as of right now as it took a while to get everything working, I've currently just added simple buttons on index.html with no styling. But to summarise: 
          *Registration: takes the users data (user + pass) and stores it in the database checking basic info such as the username not already existing.
          *Login: Checks the users entered data vs the database to check if there is a match
          *Sessions: Using [express-session](https://www.npmjs.com/package/express-session) to create a session inside the browser allowing the user to stay logged in     
    * *I'll leave the styling to someone else and focus on functionality*
    *  We may be able to make this more complex if there's reason to do so based on our previous modules.

* These buttons redirect to their related page e.g the login button redirects to [login.html](public/login.html) and the register button to [register.html](public/register.html) 
    * Again, these pages have *no styling* let me know if any of this needs to be changed functionality wise.

* Sessions are working as intended, users can leave the page and return to it and their details should be saved for a day
    * *this can be adjusted if you guys think that's not long enough/too long*

## Contacts page 

* Contacts page now has full json functionality, user's messages' are sent to the json file [contacts.json](public/json/contact.json)

## Additional Features/Fixes

* As a test harness I've added a piece of text saying "Welcome Guest"(No user logged in) or "Welcome [username]"(When logged in) this is located in [index.html](public/index.html) under the id "welcome-message" *in case anyone wants to style it or remove it* - I added it to test that sessions were working correctly

* Changed the structure of the directory so we now have css, js and json folders containing their respective files just to make everything a bit neater

* Missing hamburgers + js for hamburger functionality on certain pages added for mobile users

### Notes

* If anyone's struggling to do any of the previous setup just let me know 

* anyone working on the main code should add to this so we can all understand any changes made (just follow the general [structure](https://wordpress.com/support/markdown-quick-reference/) and make a new heading e.g "# Version History 06/06/2025 [CDS]")
