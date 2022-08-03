import { gql, useMutation } from '@apollo/react-hoc';
import React from 'react';

const MESSAGE_UPDATE = gql`
  mutation($updateMessageId: ID!, $text: String!) {
    updateMessage(id: $updateMessageId, text: $text) {
      id
      text
    }
  }
`;

function useRetainUpdatedValue(functionName: string) {
  if (functionName) {
    const [saveMessage] = useMutation(MESSAGE_UPDATE);

    return {
      [functionName]: (
        event: React.FocusEvent<HTMLTextAreaElement, Element>,
        id: string,
        // eslint-disable-next-line no-unused-vars
      ) => {
        const updateMessageId = id;
        const text = event.target.value;

        saveMessage({
          variables: {
            updateMessageId,
            text
          }
        });
      }
    };
  }

  return { [`${functionName}onChange`]: () => 'No data entered' };
}

export default useRetainUpdatedValue;
