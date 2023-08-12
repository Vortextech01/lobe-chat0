import { ChatInputArea, DraggablePanel, Icon, Tooltip } from '@lobehub/ui';
import { Button } from 'antd';
import { LucideGalleryVerticalEnd } from 'lucide-react';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CHAT_TEXTAREA_HEIGHT, HEADER_HEIGHT } from '@/const/layoutTokens';
import { useGlobalStore } from '@/store/global';
import { useSessionStore } from '@/store/session';

import InputActions from './Action';
import ActionsRight from './ActionRight';
import Token from './Token';

const ChatInput = () => {
  const { t } = useTranslation('common');
  const [expand, setExpand] = useState<boolean>(false);
  const [text, setText] = useState('');

  const [inputHeight] = useGlobalStore((s) => [s.inputHeight]);
  const [sendMessage, hasTopic, saveToTopic] = useSessionStore((s) => [
    s.createOrSendMsg,
    !!s.activeTopicId,
    s.saveToTopic,
  ]);

  const footer = hasTopic ? null : (
    <Tooltip title={t('topic.saveCurrentMessages')}>
      <Button icon={<Icon icon={LucideGalleryVerticalEnd} />} onClick={saveToTopic} />
    </Tooltip>
  );

  return (
    <DraggablePanel
      expandable={false}
      fullscreen={expand}
      headerHeight={HEADER_HEIGHT}
      minHeight={CHAT_TEXTAREA_HEIGHT}
      onSizeChange={(_, size) => {
        if (!size) return;
        useGlobalStore.setState({
          inputHeight: typeof size.height === 'string' ? Number.parseInt(size.height) : size.height,
        });
      }}
      placement="bottom"
      size={{ height: inputHeight, width: '100%' }}
      style={{ zIndex: 10 }}
    >
      <ChatInputArea
        actions={
          <>
            <InputActions />
            <Token input={text} />
          </>
        }
        actionsRight={<ActionsRight />}
        expand={expand}
        footer={footer}
        minHeight={CHAT_TEXTAREA_HEIGHT}
        onExpandChange={setExpand}
        onInputChange={setText}
        onSend={sendMessage}
        placeholder={t('sendPlaceholder')}
        text={{
          send: t('send'),
        }}
      />
    </DraggablePanel>
  );
};

export default memo(ChatInput);
