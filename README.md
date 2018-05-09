# Animal_behaviour-Project
#Master Thesis for Real-time web comunication
V0.1
 - added project to GIT. Features included: 
 - get animals from server
 - receive animals in the animal area
 - user can click on each animal, creating an object with animal name in the       process
V0.2 
 - finished implementing the basic functionality of the get_behaviour.
    For each animal clicked, the actions for that animal are returned in the behaviour area along with the animal name.
 - Added the readme log for keeping track on the changes.                                              
V0.3 
  - restricted the "get_animal" button to only once.
  - started working on the "start_cycle" button, as of now it returns the 
    whole animal object from the behaviour area.
v0.4
  - added activation of start_cycle button only after the user selects an animal
  - start the implementation of the area_status system. This system takes 3 bytes
    one for each area and determines which is full and which isn't. For now it only works once, for the defaul-empty areas.
  - now the start_cycle shows the behaviour of the animal selected in the area_1. This is the prototype.
