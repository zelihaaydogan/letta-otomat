// @mui
import { styled } from '@mui/material/styles';
import { Grid, RadioGroup, CardActionArea } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
//
import BoxMask from './BoxMask';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

// ----------------------------------------------------------------------

const BoxStyle = styled(CardActionArea)(({ theme }) => ({
  height: 72,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.disabled,
  border: `solid 1px ${theme.palette.grey[500_12]}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.25,
}));

// ----------------------------------------------------------------------

export default function SettingMode() {
  const { themeMode, onChangeMode } = useSettings();

  return (
    <RadioGroup name="themeMode" value={themeMode} onChange={onChangeMode}>
      <Grid dir="ltr" container spacing={2.5}>
        {['light', 'dark'].map((mode, index) => {
          const isSelected = themeMode === mode;

          return (
            <Grid key={mode} item xs={6}>
              <BoxStyle
                sx={{
                  bgcolor: mode === 'light' ? 'common.white' : 'grey.800',
                  ...(isSelected && {
                    color: 'primary.main',
                    boxShadow: (theme) => theme.customShadows.z20,
                  }),
                }}
              >
                {index === 0 ? <WbSunnyIcon /> : <DarkModeIcon />}
                <BoxMask value={mode} />
              </BoxStyle>
            </Grid>
          );
        })}
      </Grid>
    </RadioGroup>
  );
}
