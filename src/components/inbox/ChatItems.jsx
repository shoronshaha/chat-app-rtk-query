import { useSelector } from "react-redux";
import { useGetConversationsQuery } from "../../features/conversations/conversationsApi";
import ChatItem from "./ChatItem";
import Error from "../ui/Error";
import moment from "moment";

export default function ChatItems() {
  const { user } = useSelector((state) => state.auth);
  const { email } = user || {};
  const {
    data: conversations,
    isLoading,
    isError,
    error,
  } = useGetConversationsQuery(email);

  let content = null;

  if (isLoading) {
    content = <li className="m-2 text-center">Loading...</li>;
  } else if (!isLoading && isError) {
    content = (
      <li className="m-2 text-center">
        <Error message={error?.data}></Error>
      </li>
    );
  } else if (!isLoading && !isError && conversations?.length === 0) {
    content = <li className="m-2 text-center">No conversations found!</li>;
  } else if (!isLoading && !isError && conversations?.length > 0) {
    content = conversations.map((conversation) => {
      const { id, message, timestamp } = conversation;
      return (
        <li key={id}>
          <ChatItem
            avatar="https://i.ibb.co.com/GMs0T5n/profile.jpg"
            name="smaran"
            lastMessage={message}
            lastTime={moment(timestamp).fromNow()}
          ></ChatItem>
        </li>
      );
    });
  }

  return (
    <ul>
      <li>{content}</li>
    </ul>
  );
}
