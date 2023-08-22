import { Loading3QuartersOutlined } from '@ant-design/icons';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useSessionStore } from '@/store/session';
import { ChatMessage } from '@/types/chatMessage';

import CustomRender from './CustomRender';

export interface FunctionMessageProps extends ChatMessage {
  loading?: boolean;
}

const PluginMessage = memo<FunctionMessageProps>(
  ({
    content,
    // loading,
    name,
  }) => {
    const { t } = useTranslation('plugin');

    const manifest = useSessionStore((s) => s.pluginManifestMap[name || '']);
    let isJSON = true;
    try {
      JSON.parse(content);
    } catch {
      isJSON = false;
    }

    // if (!loading)

    if (!isJSON) {
      return (
        <Flexbox gap={8} horizontal>
          <div>
            <Loading3QuartersOutlined spin />
          </div>
          {t('loading.content')}
        </Flexbox>
      );
    }

    if (!manifest.ui?.url) return;

    return (
      <CustomRender content={JSON.parse(content)} name={name || 'unknown'} url={manifest.ui?.url} />
    );
  },
);

export default PluginMessage;
