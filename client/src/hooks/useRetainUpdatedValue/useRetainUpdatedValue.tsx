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
      [functionName]: (event: React.FocusEvent<HTMLTextAreaElement, Element>, id: number) => {
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

  return { onChange: () => 'No data entered' };
}

export default useRetainUpdatedValue;
