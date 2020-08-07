import boardList from '../boardList/boardList';
import userData from '../../helpers/data/userData';
import utils from '../../helpers/utils';
import './profile.scss';

const displayProfile = () => {
  const userId = utils.getCurrentUserId();
  userData.getUserById(userId)
    .then((user) => {
      const domString = `
      <div id="profile-page" class="d-flex flex-column align-items-center">
        <div>
          <img src="${user.profilePic}" alt="profile picture" id="profile-page-pic">
        </div>
        <div id="profile-page-name" class="text-center mt-3">
          <h3>${user.name}</h3>
        </div>
        <div class="mt-3">
            <span class="fa-stack fa-1x" id="edit-profile-btn">
              <i class="fas fa-circle fa-stack-2x"></i>
              <i class="fas fa-edit fa-stack-1x fa-inverse"></i>
            </span>
        </div>
        <div class="mt-3 hide" id="edit-profile-form">
          <form>
            <div class="form-group">
              <label for="set-new-profilepic">Profile Pic URL:</label>
              <input type="text" class="form-control" id="set-new-profilepic" value="${user.profilePic}">
            </div>
            <div class="form-group">
              <label for="set-new-name">Name:</label>
              <input type="text" class="form-control" id="set-new-name" value="${user.name}">
            </div>
            <button type="submit" class="btn btn-primary mb-2" id="update-profile">Submit</button>
        </div>
      </div>
      `;
      utils.printToDom('#header', '');
      utils.printToDom('#content', domString);
    })
    .catch((err) => console.error(err));
};

const updateProfile = () => {
  const newInfo = {};
  const profilePic = $('#set-new-profilepic').val();
  const name = $('#set-new-name').val();
  if (profilePic) { newInfo.profilePic = profilePic; }
  if (name) { newInfo.name = name; }
  userData.updateProfile(newInfo)
    .then(() => boardList.createBoards());
};

export default { displayProfile, updateProfile };
