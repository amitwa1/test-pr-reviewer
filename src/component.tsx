import React from 'react';

// ❌ Missing type for props
export function UserCard(props) {
  // ❌ Missing type annotation for event handler
  const handleClick = (e) => {
    console.log('Clicked user:', props.user.name);
  };

  return (
    <div onClick={handleClick}>
      <h3>{props.user.name}</h3>
      <p>{props.user.email}</p>
    </div>
  );
}

// ❌ Using var instead of const/let
var userData = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
};

export default UserCard;
