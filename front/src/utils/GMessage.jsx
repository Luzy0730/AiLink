import { message } from 'antd';
import { useEffect } from 'react';

class GMessage {
  constructor() {
    this.messageApi = null;
  }

  setMessageApi(messageApi) {
    this.messageApi = messageApi;
  }

}

const globalMessage = new GMessage();
export { globalMessage };


export default function GlobalMessage() {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    globalMessage.setMessageApi(messageApi);
    return () => {
      globalMessage.setMessageApi(null);
    }
  }, [messageApi]);

  return (
    <>
      {contextHolder}
    </>
  )
}