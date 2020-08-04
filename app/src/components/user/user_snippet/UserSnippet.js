import React from 'react';
import { Comment } from 'semantic-ui-react';

const UserSnippet = ({ currentUser: user }) => {
    return (user && user.profile ? (
        <Comment.Group>
            <Comment>
                <Comment.Avatar src={ user.profile.photo_100 } />
                <Comment.Content>
                    <Comment.Author>{ user.profile.first_name + " " + user.profile.last_name }</Comment.Author>
                    <Comment.Text>How artistic!</Comment.Text>
                </Comment.Content>
            </Comment>
        </Comment.Group>
    ) : null);
}

export default UserSnippet;