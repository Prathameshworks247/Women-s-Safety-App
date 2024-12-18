import React, { useEffect, useState } from "react"
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  useCreateChatClient,
  LoadingChannels,
  LoadingIndicator,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

const apiKey="8fpqsebfxgmt"

const user={
  id:'john',
  name:'John',
  image:'some image'
}

const filters={
  type:'messaging',
  members:{$in:[user.id]}
}

const sort={
  last_message_at:-1
}

function App() {
  const [client,setClient]=useState(null);
  const [channel,setChannel]=useState(null);

  useEffect(()=>{
    async function init(){
      const chatClient=StreamChat.getInstance(apiKey);

      if(!chatClient.userID){
        await chatClient.connectUser(user,chatClient.devToken(user.id));
      }

      const channel=chatClient.channel('messaging','react-talk',{
        members:[user.id],
        name:'Talk with react'
      });

      await channel.watch();

      setChannel(channel);
      setClient(chatClient);
    }

    init();

    if(client){
      return async ()=>{
        await client.disconnectUser();
      }
    }
  },[client]);

  if(!client || !channel){
    return <LoadingIndicator/>
  }

  return <Chat client={client} theme="messaging light">
    {/* <ChannelList filters={filters} sort={sort}/> */}
    <Channel channel={channel}>
      <Window>
        <ChannelHeader/>
        <MessageList/>
        <MessageInput/>
      </Window>
      <Thread/>
    </Channel>
  </Chat>
}

export default App