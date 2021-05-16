# Assignment 4
SEEDING - Could not get seed file to work so I included users.json and posts.json which you can add to mongodb by clicking ADD DATA.  Sorry, this was the only way I could figure out how to get the data to you.

## Functionality
C - replace check user and save user with validate then create then redirect view
changed login to use passport authenticate (PAIN IN THE BUTT)
R - Show list of all users to user on home page as follow suggestions - if they click a user they can see that user's information
U - user can update their information by clicking on their name once logged in on the right of the navigation bar on top of screen.
D - delete works 

Express validator has now replaced our old way of validation.
Emails are checked to follow format.  Password is checked. There are no integer property becaues we didn't include age in our platform.

Logging in works and cookies, sessions, and passport have been added.

Navbar has options to logout and click on your name (currently logged in user) where they can view their credentials and edit or delete the account if they wish.

Added Post capabilities - a lot of the post modifications happen from the users views and user controllers because that made more sense.

There is post creation from the user home page, post editing is not allowed. User profile information displays the number of posts a user has and you can see all of the posts you have posted.

User's can delete their posts but it only deletes from the posts collection. For some reason I cannot get it to delete from user's posts array. When displaying the users posts the posts no longer show, but they are still counted even though they are deleted which messes with the user's number of posts.  

From the navigation bar, user's can click their name which then shows all of their information, they can also click "Your posts" To see their specific posts, as the homepage shows all posts available. 
There is a side menu which lists all users in the system on the homepage. I have a Trending option on the nav bar which is a placeholder.

Most functionality is there, however the design is very minimal since we focused on functionality.

