const fs = require('fs');

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      users: 'All Users',
    },
  });
};

exports.getUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    tour: 'user',
  });
};

exports.addUser = (req, res) => {
  res.send('user added');
};

exports.updateUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    tour: 'Updated',
  });
};

exports.deleteUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    tour: 'Record Deleted',
  });
};
