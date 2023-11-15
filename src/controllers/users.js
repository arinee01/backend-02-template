const User = require('../models/user')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const getUsers = (request, response) => {
return User.find({}).then((data) => {
  response.status(200).send(data)
})
}

// const getUser = (request, response) => {
//     const { user_id } = request.params
//     return User.findById(user_id).then(
//       (user) => {
//         response.status(200), response.send(user)
//       }
//     ).catch(e => response.status(500).send(e.message))
    
// }

const getUser = (request, response) => {
  const { user_id } = request.params;
  if (!ObjectId.isValid(user_id)) {
    response.status(404).send("User not found");
    return;
  }
  
  return User.findById(user_id)
    .then((user) => {
      if (user) {
        response.status(200).send(user);
      } else {
        response.status(404).send("User not found");
      }
    })
    .catch((e) => response.status(500).send(e.message));
};

const createUser = (request, response) => {
  return User.create({...request.body}).then(
    (user) => {
      response.status(201).send(user)
    }
  ).catch(e => response.status(500).send(e.message))
}

// const updateUser = (request, response) => {
//   const { user_id } = request.params
//   return User.findByIdAndUpdate(user_id, {...request.body}).then(
//     (user) => {
//       response.status(200), response.send(user)
//     }
//   ).catch(e => response.status(500).send(e.message))
// }

const updateUser = (request, response) => {
  const { user_id } = request.params;
  if (!ObjectId.isValid(user_id)) {
    response.status(404).send("User not found");
    return;
  }
  
  return User.findByIdAndUpdate(user_id, {...request.body})
    .then((user) => {
      if (user) {
        response.status(200).send(user);
      } else {
        response.status(404).send("User not found");
      }
    })
    .catch((e) => response.status(500).send(e.message));
};



// const deleteUser = (request, response) => {
//   const { user_id } = request.params
//   return User.findByIdAndDelete(user_id).then(
//     (user) => {
//       response.status(200), response.send("Success")
//     }
//   ).catch(e => response.status(500).send(e.message))
// }


const deleteUser = (request, response) => {
  const { user_id } = request.params;
  if (!ObjectId.isValid(user_id)) {
    response.status(404).send("User not found");
    return;
  }
  
  return User.findByIdAndDelete(user_id)
    .then((user) => {
      if (user) {
        response.status(200), response.send("Success")
      } else {
        response.status(404).send("User not found");
      }
    })
    .catch((e) => response.status(500).send(e.message));
};


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
}
