import { MouseEvent } from 'react';
import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

const LanguageToggle = ({
  handleLanguageChange,
}: {
  handleLanguageChange: (
    event: MouseEvent<HTMLElement>,
    newLang: string
  ) => void,
}) => {
  const { i18n } = useTranslation();

  return (
    <Box display='flex' justifyContent='flex-end' marginTop={2}>
      <ToggleButtonGroup
        value={i18n.language}
        exclusive
        onChange={handleLanguageChange}
        aria-label='language'
      >
        <ToggleButton value='en' aria-label='english'>
          {t('language.english')}
        </ToggleButton>
        <ToggleButton value='he' aria-label='hebrew'>
          {t('language.hebrew')}
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default LanguageToggle;
