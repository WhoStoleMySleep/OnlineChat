import { gql } from '@apollo/react-hoc';

const addMessageMutation = gql`
  mutation messageCreated($text: String!, $author: String!, $date: String!) {
    createMessage(text: $text, author: $author, date: $date) {
      id
      text
      author
      date
    }
  }
`;

const MESSAGES_SUBSCRIPTION = gql`
  subscription MessageCreated {
    messageCreated {
      id
      text
      author
      date
    }
  }
`;

const MESSAGES_UPDATED = gql`
  subscription MessageUpdated {
    messageUpdated {
      id
      text
    }
  }
`;

const MESSAGES_REMOVED = gql`
  subscription MessageUpdated {
    messageRemoved {
      id
    }
  }
`;

const MESSAGES_QUERY = gql`
  query Messages {
    messages {
      id
      text
      author
      date
    }
  }
`;

const MESSAGE_UPDATE = gql`
  mutation($id: ID!) {
    removeMessage(id: $id)
  }
`;

export {
  addMessageMutation,
  MESSAGES_SUBSCRIPTION,
  MESSAGES_UPDATED,
  MESSAGES_REMOVED,
  MESSAGES_QUERY,
  MESSAGE_UPDATE
};
