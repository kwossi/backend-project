user edits mixtape

- Routes:
  - Mixtapes routes:
    - update Mixtape
    - delete Mixtape (test) -> delete also from User List!!!!!


- MongoDB: add cluster for this
- POSTMAN testing routes

DONE:

- User login
- user registration
- Get User Data:

  - Profile

- Models:

  - Mixtape
    - name
    - creator
    - playlist: [Objects] -> nested Schema
  - User:

    - username
    - email
    - password
    - mixtapes (populate with mixtape model)

      - Users Routes:

    - login
    - register
    - logout
    - show all User Data

    - JWT token for verification -> should be there, missing verification and has to be implemented

- cookies

user creates mixtape - Routes:

- Mixtapes routes:
  - create Mixtape
  - get all publich mixtapes
  - get one mixtape