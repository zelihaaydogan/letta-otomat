// @mui
import { Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// _mock_
import { _userCards } from '../../../_mock';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { UserCard } from '../../../sections/@dashboard/user/cards';
import { m } from 'framer-motion';
// next
import NextLink from 'next/link';
import { styled } from '@mui/material/styles';
// @mui
import { Button, Typography, Container } from '@mui/material';
// layouts
// components
import { MotionContainer, varBounce } from '../../../components/animate';
// assets
import { SeverErrorIllustration } from '../../../assets';

// ----------------------------------------------------------------------

UserList.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};
const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));
// ----------------------------------------------------------------------

export default function UserList() {
  return (
    // <Page title="User: Cards">
    //   <Container maxWidth={themeStretch ? false : 'lg'}>
    //     <HeaderBreadcrumbs
    //       heading="User Cards"
    //       links={[
    //         { name: 'Dashboard', href: PATH_DASHBOARD.root },
    //         { name: 'User', href: PATH_DASHBOARD.user.root },
    //         { name: 'Cards' },
    //       ]}
    //     />

    //     <Box
    //       sx={{
    //         display: 'grid',
    //         gap: 3,
    //         gridTemplateColumns: {
    //           xs: 'repeat(1, 1fr)',
    //           sm: 'repeat(2, 1fr)',
    //           md: 'repeat(3, 1fr)',
    //         },
    //       }}
    //     >
    //       {_userCards.map((user) => (
    //         <UserCard key={user.id} user={user} />
    //       ))}
    //     </Box>
    //   </Container>
    // </Page>
    <Page title="Geliştiriliyor">
      <Container component={MotionContainer}>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <m.div variants={varBounce().in}>
            <Typography variant="h3" paragraph>
              Sayfa geliştirilmeye devam ediyor.
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
          </m.div>

          <NextLink href="/" passHref>
            <Button size="large" variant="contained">
              Özet Ekrana geri dön
            </Button>
          </NextLink>
        </ContentStyle>
      </Container>
    </Page>
  );
}
