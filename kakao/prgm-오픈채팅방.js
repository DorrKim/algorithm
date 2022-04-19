function solution(record) {
  const userNickNames = new Map();
  const chatRoomRecord = [];
  const messageByCommand = {
    Enter: '들어왔습니다.',
    Leave: '나갔습니다.'
  };

  record.forEach((line) => {
    const [command, id, nickName] = line.split(' ');
    if (command === 'Leave' || command === 'Enter')
      chatRoomRecord.push({
        type: command,
        userId: id
      });

    if (command !== 'Leave') {
      userNickNames.set(id, nickName);
    }
  });

  const chatRoomMessages = chatRoomRecord.map(
    ({ type, userId }) => `${userNickNames.get(userId)}님이 ${messageByCommand[type]}`
  );

  return chatRoomMessages;
}
