import { TiMessage } from 'react-icons/ti';

const ReplyLabel = () => {
  return (
    <div className="flex flex-row gap-1 hover:text-blue-500">
      <TiMessage className="w-5 h-5" />
      <div>Reply</div>
    </div>
  );
};

export default ReplyLabel;
