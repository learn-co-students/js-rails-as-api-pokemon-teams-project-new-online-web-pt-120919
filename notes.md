1. create the backend API: rails new pokemon-teams-backend --api
2. add to Gemfile.rb gem 'faker'
3. uncomment in Gemfile.rb:gem 'rack-cors'
4. uncomment in config/initializers/cors.rb (change origin to *)
cd into the backend 
5. run bundle install!!!! 

BACK END
SET UP CONTROLLER, MODEL, MIGRATION FILES, VIEWS
6. create Resource: Trainer:rails g resource trainer name --no-test-framework
7. create Resource: Pokemon:rails g resource pokemon species nickname trainer:references --no-test-framework
8. Run the migrations; rake db:migrate 
9. put whats in the readme in seed file run rake db:seed
    requre 'faker and require 'securerandom'
    Trainer.delete_all 
    Pokemon.delete_all
10. check rake console to see trainers and pokemon
11. check models and make sure associations are there (has many belongs to)
12. add validation in pokemon class for maximum 6 pokemon 
13. check config/routes make sure they are there
14. go to trainer controller add index and show
15. add serializer gem active_model_serializers 
16. create folder with serializer name and both serializers but attributes we want and relationships
17. run bundle install
18. check rails s backend to make sure serializer works correctly. 

FRONTEND 
19. make sure you cd into frontend to open index.html
20. select the main and set it to a const variable
21. document.addEventListener("DOMContentLoaded), ect....
22. Make fetch request to fetch the trainers 
    - put console.log in .then to make sure it is working. 
    - open from browser go to sources go to index.js click on number next to line you want to put debugger it will trigger a debugger. 
    move code on seperate line in index.js and try to run debugger again sometime it doesnt like it if its on same line as .then
23. check the trainer info and see if you have all the info you need to start creating a trainer with pokemon if you do make a function for rendering that trainer. 
24. look at the read me example and make the elements you need(div, ul ect....)
25. set attributes based of example in read me
27. set innerText
28. append the elements to the document do it by order on read me 
29.check the index to make sure it has the elements we appened 
30. for each trainer.pokemons forEach (pokemon => function)
31. make renderPokemon check what pokemon is with debugger or console.log
32. get element ul and set it to a variable 
33. create li 
34. create button
35. set innerHTML
36. set attributes 
37. append child
38. add event listener to button to add pokemon and add one to delete button
39. make function to create pokemon/ make function to delete pokemon

----------BACK TO BACKEND TO ADD CREATE AND DELETE FOR POKEMON------------------
40. make sure you have index, show for pokemon check the server to make sure you have them. 
41. make create 
41. have trainer set to params[trainer_id]
42. make a pokemon and species based on Faker (look how they created this through the seed file)
43. make sure you show json error message if it doesn't save (doesnt meet validations)
44. make destroy and find and destroy pokemon 
--------------BACK TO FRONTEND -----------------------
45. go to create function and delete function makesure you have e.preventDefault
46. send POST request 
47. when looking at what to set trainer_id to user debugger on the click event and check out what e.target.dataset is
48. to check error messages in pry through rails put error
errors.messages
49. in json if json.message alert(message)
50. make delete function method DELETE 
51. no body we are not passing anything to the backend 
52. make sure you set the fetch to the individual pokemon url 
53. remove the parent element of e.target 










