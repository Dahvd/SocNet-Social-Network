# Final Assignment

## Functionality
Sign-up login and logout use passport, express-session and cookies along with express-validator for sanitzation and validation.

User's are able to post and they can see all posts by those they follow on their home page.  They can also delete their own posts however the post counter in their profile does not work and remains an issue to be resolved.

User's can follow other users and they will see all of the posts of those they follow on their home page. Following user's while on the homepage will update the page to see posts from those user's. 

Navbar has options to logout and click on your name (currently logged in user) where they can view their credentials and edit or delete the account if they wish.

Added Post capabilities - a lot of the post modifications happen from the users views and user controllers because that made more sense.

There is post creation from the user home page, post editing is not allowed. User profile information displays the number of posts a user has and you can see all of the posts you have posted.

User's can delete their posts and this is now fixed from the previous version.

From the navigation bar, user's can click their name which then shows all of their information, they can also click "Your posts" To see their specific posts, as the homepage shows all posts available. 
There is a side menu which lists all users in the system on the homepage. I have a Trending option on the nav bar which is a placeholder.

Most functionality is there, however the design is very minimal since we focused on functionality.

# Problems to be solved

# Improvements to be made
Better use of templating to create better structure to the app and a more refined page structure.
Changing models and making sure all routes follow a good structure - somewhat unstructured as I couldn't really make sense if posts should be part of users or their own thing.
More rigorous input validation -im sure there are somethings that can either slip through or that can be "hacked" past 
Flash messages just stay and they are also at an annoying spot.
Add namespacing
Add trending/hashtags
"new" posts / notifications