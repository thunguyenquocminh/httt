import React from "react";
import { useSelector } from "react-redux";
const Welcome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-690x690">
                <img
                  src="https://static.thenounproject.com/png/3201587-200.png"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{user && user.user.name}</p>
              <p class="subtitle is-6">{user && user.user.email}</p>
              <strong> Chào mừng {user && user.user.name} đã trở lại </strong>
            </div>
          </div>

        </div>
        <div class="card-image">
          <figure class="image is-4by3">
            <img
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/agriculture-logo-design-template-7ec6b05615bf6da4c81fd7670b7b8dc0_screen.jpg?ts=1630938264"
              alt="Placeholder image"
            />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
