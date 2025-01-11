import { useSelector } from "react-redux";
import Message from "./Message";

export default function Messages({ messages = [] }) {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};

  const uniqueMessages = messages.reduce((acc, message) => {
    if (!acc.some((m) => m.id === message.id)) {
      acc.push(message);
    }
    return acc;
  }, []);

  return (
    <>
      <div className="relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse">
        <ul className="space-y-2">
          {uniqueMessages
            .slice()
            .sort((a, b) => a.timestamp - b.timestamp)
            .map((message) => {
              const { message: lastMessage, id, sender } = message || {};
              const justify = sender.email !== email ? "start" : "end";
              return (
                <Message key={id} justify={justify} message={lastMessage} />
              );
            })}
        </ul>
      </div>
    </>
  );
}
