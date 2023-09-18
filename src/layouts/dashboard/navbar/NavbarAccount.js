import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { styled } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import { PATH_DASHBOARD } from '../../../routes/paths';
import MyAvatar from '../../../components/MyAvatar';
import AuthService from '../../../services/AuthService';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
};

export default function NavbarAccount({ isCollapse }) {
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = async () => {
    const user = await AuthService.getWebUserInfo();
    if (!user || (typeof user.type !== 'undefined' && user.type === 'Failed')) return null;
    return user;
  };

  const handleUserInfo = async () => {
    const user = await getUserInfo();
    if (user) {
      setUserInfo(user.data);
    }
  };

  useEffect(() => {
    handleUserInfo();
  }, []);

  return (
    <NextLink href={PATH_DASHBOARD.general.banking} passHref>
      <Link underline="none" color="inherit">
        <RootStyle
          sx={{
            ...(isCollapse && {
              bgcolor: 'transparent',
            }),
          }}
        >
          <MyAvatar />

          <Box
            sx={{
              ml: 2,

              ...(isCollapse && {
                ml: 0,
                width: 0,
              }),
            }}
          >
            <>
              <Typography variant="subtitle2">{userInfo?.nameSurname}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {userInfo?.role === '5' ? 'Admin' : userInfo?.role}
              </Typography>
            </>
          </Box>
        </RootStyle>
      </Link>
    </NextLink>
  );
}
