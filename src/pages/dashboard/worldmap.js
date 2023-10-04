// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import TurkeyMap from '../../components/TurkeyMap';
// sections
import { AppWidgetSummary } from '../../sections/@dashboard/general/app';
import React, { useState, useEffect, useRef } from 'react';
import MapService from '../../services/MapService';
import useSwr from '../../hooks/useSwr';
import LockListDashboard from '.';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import Map from 'react-map-gl';

// ----------------------------------------------------------------------

WorldMap.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function WorldMap() {
  const token = 'pk.eyJ1IjoiZW5naW5sZXR0YSIsImEiOiJjbG40ZHA0bzAwM25qMmlvOHhteW1weXVrIn0.pMiqw2VnZnc1NJYbJfKKLQ';
  console.log(token);
  return (
    <Page title="Özet Ekranı">
      <Container>
        <Grid container spacing={3}>
          <Map
            mapLib={import('mapbox-gl')}
            initialViewState={{
              longitude: -100,
              latitude: 40,
              zoom: 3.5,
            }}
            style={{ width: 600, height: 400 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxApiAccessToken={token}
          />
          ;
        </Grid>
      </Container>
    </Page>
  );
}
