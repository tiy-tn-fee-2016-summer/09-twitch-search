import messages from 'exercise/messages';
import reverseList from 'exercise/reverse-list';
import addMessageItem from 'exercise/add-message-item';
import sumFromList from 'exercise/sum-from-list';

export default function(messagePanel, listToSum, sumTarget, listToReverse, whereToMoveTo) {
  // This is a peek at next week
  messages.forEach((message) => {
    addMessageItem(messagePanel, message);
  });

  sumTarget.innerText = sumFromList(listToSum);

  reverseList(listToReverse, whereToMoveTo);
}
