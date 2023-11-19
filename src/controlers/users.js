const User = require('../models/user');

const getUsers = async (request, response) => {
  try {
    const users = await User.find({});
    users
      ? response.status(200).send(users)
      : response.status(400).send('Users not found');
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const getUser = async (request, response) => {
  try {
    const {user_id} = request.params;
    const user = await User.findById(user_id);
    user
      ? response.status(200).send(user)
      : response.status(404).send(`User id = ${user_id} not found, please check your request`);
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const createUsers = async (request, response) => {
  const data = request.body;
  try {
    const userCreate = await User.create(data);
    userCreate
      ? response.status(200).send(userCreate)
      : response.status(404).send('Failed to create user');
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const updateUser = async (request, response) => {
  try {
    const { user_id } = request.params;
    const data = request.body;
    const userUpdate = await User.findByIdAndUpdate(user_id,{ ...data });

    if (userUpdate) {
      response.status(200).send(`User data with id = ${user_id} updated`);
      
    } else {
      response.status(404).send('User not found');
    }
  } catch (e) {
    response.status(500).send(e.message);
  }
};

const deleteUser = async (request, response) => {
  try {
    const { user_id } = request.params;
    const user = await User.findByIdAndDelete(user_id);

    if (user) {
      response.status(200).send(`User with ID = ${user_id} deleted`);
      
    } else {
      response.status(404).send(`User with ID = ${user_id} not found`);
    }
  } catch (e) {
    response.status(500).send(e.message);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUsers,
  updateUser,
  deleteUser,
};
