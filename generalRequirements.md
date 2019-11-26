# Michelin Star Restaurant Dashboard

Welcome to Le Baguette.  The only restaurant in the world to have to have 27 Michelin stars. Le Baguette is an Asian, Russian, German, and French fusion restaurant using only the freshest ingredients from local farms.  

Now that Le Baguette has received its 27th star its owners would like to bring the restaurant into the modern age and build it a nice website.  You will be helping them keep track of staff, ingredients, reservations, and Menu Items.
## Due Date
The demo for this project will take place on Wednesday November 20th


## Requirements

## Labor Division
* Everyone on your team is responsible for CRUD on one collection.
* If your project requires more collections than you have people it is expected that you evenly distribute the remaining work
* We expect everyone's code contributions to be close (within 200 lines of code) by the end of the project
* Are you a CSS wizard?  If so you shouldn't be doing CSS on this project.  Pick tickets that are outside your comfort zone.

## Planning Requirements
* Each team has been assigned a Project Manager.  Your Project Manager is **Zoe**
* Your product owner is the only person you can ask requirement questions - none of the other Project Managers know your project
* You can ask any instructor coding questions
* You **MUST** show your Product Manager your ERD before you begin writing tickets
* You **MUST** show your Product Manager your tickets before you start coding
* Your site should be fully branded - so you should have wireframes as needed
* Single responsibility principle - each function should do one thing NO junk drawer functions

## Technical Requirements
* The only link that you can demo is a deployed firebase link
* Create 1 firebase project - team leads will own this (add everyone else on your team)
* You can use **ANY** technology we have used so far - jquery, bootstrap, es6 modules, etc
* Properly use github - a branch for each feature.  Test each others PRs.
* CLEAN CODE - there should be no eslint errors or warnings on a PR

## High Level MVP
* Authenticate to perform any actions (CUD)
* Staff module
* Ingredients module
* Reservations module
* Seating module
* Menu Items module
* Filter Menu Items on ingredients

# Part 2: General Requirements

# Michelin Restaurant Dashboard

The original team working on this project spent all their time eating the food instead of writing code so they have been let go. The owners of Le Baguette desperately need someone to come in an hook up all the different modules the first group made. The owners also want a way to keep track of everything happening in their restaurant.

## Due Date
The demo for this project will take place on Wednesday December 4th

## Requirements
See Part 1 General Requirements Ticket

## High Level MVP
- Reservations should be related to staff members, orders and tables.
- Authenticated users should be able to track restaurant revenue, inventory, and menu items

## User Stories
All of the following user stories assume the user is authenticated unless otherwise stated.

#### Reservations
- As a user I should be able to assign staff members to reservations.
- As a user there should be some way to tell if a reservation has all the staff they need (waiter, bar tender, bussboy, etc.)
- As a user I should be able to assign a table to a reservation.
- As a user I should only be able to assign a table with the appropriate number of seats for that party (ie a reservation for 4 should not be assigned to a table with 2 seats).  
- As a user I should be able to view a single reservation page that displays all the information about that reservation.
<!-- reservations need staffId as there will be multiple reservations w/ same staff member, not the other way around. -->
<!-- should we create a key in each collection for necessary staff roles? (i.e., create a "Server's Assistant", "Bartender", etc, fields in each reservation object) This would allow us to check if any fields are empty, and if so, assign staff to that respective role -->
<!-- we should create a new "sections" collection, or add a "sections" field to the tables. This would allow us to sort by section and automatically assign staff by section instead of manually to each order (though we could always update as needed)  -->
<!-- function to compare "partySize" value to the "numOfSeats" value from within the seatings collection/object to permit table assignment -->
<!-- possible stretch goal: automate the table assignment for reservations -->
<!-- if table automation is achieved, we can then make reservations possible without login so that customers can self-serve reservations -->


#### Orders
- As a user I should be able to assign menu items to reservations
- As a user I should not be able to assign a menu item to a reservation if any of the ingredients from that menu item are sold out.
- As a user I should be able to create a final bill for each reservation.  This bill should show up on the single reservation pages.
<!-- I forsee a tragic number of smash functions :( -->
<!-- WTF WHY IS THE PRICE OF A MENU ITEM A STRING?! -->
<!-- seems potentially confusing that the reservations object is "seatingId" instead of "seatingsId" -->
<!-- easiest way seems to be to create a new key field of 'finalBill' that has an array as it's value, with the bill equalling the total of all menu items added to the reservation -->


#### Reporting
- As a user I want to be able to see what the total revenue is for my restaurant since I opened.
- As a user I want to be able to see what the revenue is for my restaurant over a 7 day period.
- As a user I want to be able to see what the revenue is for my restaurant over a particular day.
- As a user I should be able to track the amount of ingredients used on a single day.
- As a user I should be able to track the amount of ingredients used over a 7 day period.
- As a user I should be able to track the amount of ingredients used since my restaurant opened.
- As a user I should be able to see a list of the top 10 most popular menu items.
- As a user I should be able to see a list of the 10 least popular menu items.

<!-- create a database that records daily data and then runs a report against it based on date range (meaning you can select for single or multiple days) -->

<!-- We *know* we're not going to get fully done, so let's choose our losses strategically. -->

<!-- All buttons that hide for login/logout have class of cudButton just fyi -->
